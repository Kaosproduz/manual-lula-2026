// crachas-list.js — gera a lista placeholder de 100 credenciados (nomes lorem
// ipsum) e filtra por nome/equipe conforme o usuário digita na busca.

(function () {
  const LOREM_FIRST = ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Eiusmod'];
  const LOREM_LAST = ['Tempor', 'Incididunt', 'Labore', 'Magna', 'Aliqua', 'Veniam', 'Nostrud', 'Exercitation', 'Ullamco', 'Laboris'];
  const TEAMS = ['Produção', 'Segurança', 'Som', 'Imprensa', 'Logística', 'Cerimonial', 'Estrutura', 'Transporte'];
  const FUNCOES = ['Coordenador(a)', 'Assistente', 'Técnico(a)', 'Apoio', 'Supervisor(a)'];
  const TOTAL = 100;

  const credenciados = Array.from({ length: TOTAL }, (_, i) => {
    const nome = `${LOREM_FIRST[i % 10]} ${LOREM_LAST[Math.floor(i / 10)]}`;
    const equipe = TEAMS[i % TEAMS.length];
    const funcao = FUNCOES[i % FUNCOES.length];
    const pendente = i % 11 === 0;
    return {
      cracha: `CR-${String(i + 1).padStart(3, '0')}`,
      nome,
      equipe,
      funcao,
      status: pendente ? 'Pendente' : 'Credenciado',
    };
  });

  const tbody = document.getElementById('crachas-tbody');
  const searchInput = document.getElementById('crachas-search');
  const countEl = document.getElementById('crachas-count');

  const render = (filter) => {
    const term = filter.trim().toLowerCase();
    const rows = credenciados.filter((c) =>
      !term || c.nome.toLowerCase().includes(term) || c.equipe.toLowerCase().includes(term)
    );

    tbody.innerHTML = rows.map((c) => `
      <tr>
        <td>${c.cracha}</td>
        <td>${c.nome}</td>
        <td>${c.equipe}</td>
        <td>${c.funcao}</td>
        <td><span class="crachas-status ${c.status === 'Credenciado' ? 'crachas-status--ok' : 'crachas-status--pending'}">${c.status}</span></td>
      </tr>
    `).join('');

    countEl.textContent = `${rows.length} de ${TOTAL} exibidos`;
  };

  searchInput.addEventListener('input', () => render(searchInput.value));
  render('');
})();
