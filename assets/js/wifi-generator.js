// wifi-generator.js — gera senhas novas (e o QR code correspondente) para as redes
// Wi-Fi do comício e da caminhada. Nomes de rede são fixos; senha e QR mudam a cada
// geração e não ficam salvos em lugar nenhum — tudo roda no navegador de quem abrir a página.

(function () {

  var NETWORKS = [
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_IMPRENSA',   label: 'Área de imprensa — Imprensa',                spec: '60 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_PRODUCAO',   label: 'Sala de produção — Produção / técnica',      spec: '50 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_CRED1',      label: 'Entrada — Credenciamento 1 (staff/imprensa)', spec: '50 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_CRED2',      label: 'Entrada — Credenciamento 2 (autoridades)',   spec: '50 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_HOUSEMIX',   label: 'House mix',                                  spec: '60 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_SALAPR',     label: 'Backstage — Sala PR',                        spec: '50 Mb · Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_STUCKERT',   label: 'Backstage — Área Stuckert',                  spec: '60 Mb · Cabeado + Wi-Fi' },
    { event: 'Comício',   slug: 'comicio',   ssid: 'LULA26_PASSARELA',  label: 'Palco — Passarela do palco',                 spec: '100 Mb · Wi-Fi' },
    { event: 'Caminhada', slug: 'caminhada', ssid: 'LULA26-CONCENTRACAO',  label: 'Área coletiva de imprensa (concentração)',   spec: '50 Mb · Wi-Fi' },
    { event: 'Caminhada', slug: 'caminhada', ssid: 'LULA26-TRIOSOM',       label: 'Trio elétrico — imprensa/som (deslocamento)', spec: '50 Mb · Wi-Fi' },
    { event: 'Caminhada', slug: 'caminhada', ssid: 'LULA26-CAMINHADA',     label: 'Trio elétrico — fala do Presidente (ponto final)', spec: '50 Mb · Wi-Fi' }
  ];

  var ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  var PASS_LENGTH = 12;

  function generatePassword() {
    var bytes = new Uint32Array(PASS_LENGTH);
    crypto.getRandomValues(bytes);
    var out = '';
    for (var i = 0; i < PASS_LENGTH; i++) {
      out += ALPHABET[bytes[i] % ALPHABET.length];
    }
    return out;
  }

  function escapeWifiField(s) {
    return String(s).replace(/([\\;,:"])/g, '\\$1');
  }

  function wifiPayload(ssid, pass) {
    return 'WIFI:T:WPA;S:' + escapeWifiField(ssid) + ';P:' + escapeWifiField(pass) + ';;';
  }

  function groupByEvent(list) {
    var order = [];
    var map = {};
    list.forEach(function (n) {
      if (!map[n.event]) { map[n.event] = { slug: n.slug, items: [] }; order.push(n.event); }
      map[n.event].items.push(n);
    });
    return order.map(function (event) { return { event: event, slug: map[event].slug, items: map[event].items }; });
  }

  // O SVG sai da lib com width/height literais em px (cellSize * módulos + margem) —
  // de propósito não usamos a opção "scalable" (que omite width/height e depende só de
  // CSS percentual): no Firefox, dentro de grid/flex, isso deixa o tamanho intrínseco
  // ambíguo e o QR pode sair cortado. Com px fixo no SVG + max-width/max-height no CSS,
  // o tamanho é sempre resolvido de forma inequívoca em qualquer navegador.
  function renderQr(container, text) {
    container.innerHTML = '';
    var qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();
    var svg = new DOMParser().parseFromString(
      qr.createSvgTag({ cellSize: 8, margin: 4 }),
      'image/svg+xml'
    ).documentElement;
    svg.style.display = 'block';
    container.appendChild(svg);
  }

  function buildCard(network) {
    var card = document.createElement('div');
    card.className = 'wifi-card';
    card.innerHTML =
      '<div class="wifi-card__body">' +
        '<p class="wifi-card__label">' + network.label + '</p>' +
        '<p class="wifi-card__ssid">' + network.ssid + '</p>' +
        '<span class="wifi-card__spec">' + network.spec + '</span>' +
        '<div class="wifi-card__pass-row">' +
          '<span class="wifi-card__pass js-pass"></span>' +
          '<button class="wifi-btn wifi-btn--ghost js-copy" type="button">Copiar</button>' +
          '<button class="wifi-btn wifi-btn--ghost js-regen" type="button" title="Gerar nova senha para esta rede">↻</button>' +
        '</div>' +
      '</div>' +
      '<div class="wifi-card__qr js-qr"></div>';

    var passEl = card.querySelector('.js-pass');
    var qrEl = card.querySelector('.js-qr');
    var copyBtn = card.querySelector('.js-copy');
    var regenBtn = card.querySelector('.js-regen');

    function regenerate() {
      var pass = generatePassword();
      passEl.textContent = pass;
      renderQr(qrEl, wifiPayload(network.ssid, pass));
    }

    copyBtn.addEventListener('click', function () {
      var pass = passEl.textContent;
      var done = function () {
        copyBtn.textContent = 'Copiado';
        setTimeout(function () { copyBtn.textContent = 'Copiar'; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pass).then(done).catch(function () {
          var range = document.createRange();
          range.selectNodeContents(passEl);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        });
      }
    });

    regenBtn.addEventListener('click', regenerate);

    regenerate();
    return card;
  }

  function render() {
    var root = document.getElementById('wifi-events');
    if (!root) return;
    root.innerHTML = '';

    groupByEvent(NETWORKS).forEach(function (group) {
      var section = document.createElement('section');
      section.className = 'wifi-event-block';
      section.dataset.eventSlug = group.slug;

      var head = document.createElement('div');
      head.className = 'wifi-event-block__head';
      head.innerHTML = '<h2>' + group.event + '</h2>' +
        '<span class="wifi-count">' + group.items.length + (group.items.length === 1 ? ' rede' : ' redes') + '</span>';
      section.appendChild(head);

      var grid = document.createElement('div');
      grid.className = 'wifi-card-grid';
      group.items.forEach(function (n) { grid.appendChild(buildCard(n)); });
      section.appendChild(grid);

      root.appendChild(section);
    });
  }

  function regenerateAll() {
    document.querySelectorAll('#wifi-events .js-regen').forEach(function (btn) { btn.click(); });
  }

  function printScope(slug) {
    if (slug) document.body.setAttribute('data-print-scope', slug);
    else document.body.removeAttribute('data-print-scope');
    window.print();
    document.body.removeAttribute('data-print-scope');
  }

  document.addEventListener('DOMContentLoaded', function () {
    render();
    var genAllBtn = document.getElementById('wifi-generate-all');
    if (genAllBtn) genAllBtn.addEventListener('click', regenerateAll);

    document.querySelectorAll('[data-print-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        printScope(btn.getAttribute('data-print-btn') || null);
      });
    });
  });

})();
