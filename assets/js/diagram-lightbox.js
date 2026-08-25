// diagram-lightbox.js — clica na moldura reduzida do esquemático e abre uma
// cópia em tamanho real dentro do lightbox (mesmo padrão de fechar da galeria).

(function () {
  const frames = document.querySelectorAll('.wire-diagram-frame');
  const lightbox = document.getElementById('diagram-lightbox');
  if (!frames.length || !lightbox) return;

  const content = lightbox.querySelector('.lightbox__diagram-content');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  const open = (frame) => {
    const original = frame.querySelector('.wire-diagram');
    if (!original) return;
    content.innerHTML = '';
    content.appendChild(original.cloneNode(true));

    const legend = frame.nextElementSibling;
    if (legend && legend.classList.contains('wire-legend')) {
      content.appendChild(legend.cloneNode(true));
    }

    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    content.innerHTML = '';
  };

  frames.forEach((frame) => {
    frame.addEventListener('click', () => open(frame));
  });

  closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
})();
