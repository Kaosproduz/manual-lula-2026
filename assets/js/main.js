// main.js — navegação: scrollspy da sidebar (destaca item ativo conforme o scroll)
// e menus colapsáveis (grupos com subitens expandem/recolhem ao clicar no cabeçalho)

(function () {
  document.querySelectorAll('.sidebar__nav > ul > li').forEach((li) => {
    const link = li.querySelector(':scope > .nav-group__link');
    const sub = li.querySelector(':scope > .nav-sub');
    if (!link || !sub) return;
    link.setAttribute('aria-expanded', 'true');
    link.addEventListener('click', (e) => {
      // Só alterna expandir/recolher — não navega, pra não conflitar com o
      // scrollspy (rolar até a seção reativaria o grupo que acabou de recolher).
      e.preventDefault();
      const collapsed = li.classList.toggle('is-collapsed');
      link.setAttribute('aria-expanded', String(!collapsed));
    });
  });
})();

(function () {
  const navLinks = Array.from(document.querySelectorAll('.nav-group__link, .nav-sub__link'));
  const targets = navLinks
    .map((link) => {
      const id = link.getAttribute('href').replace('#', '');
      const el = document.getElementById(id);
      return el ? { link, el } : null;
    })
    .filter(Boolean);

  if (!targets.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => link.classList.remove('is-active'));
    const match = targets.find((t) => t.el.id === id);
    if (!match) return;
    match.link.classList.add('is-active');

    // Se for um subitem, também destaca o grupo (capítulo) pai — sem
    // forçar reabertura caso o usuário tenha recolhido esse grupo.
    const parentGroup = match.link.closest('.nav-sub');
    if (parentGroup) {
      const prevLink = parentGroup.previousElementSibling;
      if (prevLink && prevLink.classList.contains('nav-group__link')) {
        prevLink.classList.add('is-active');
      }
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) {
        setActive(visible[0].target.id);
      }
    },
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
  );

  targets.forEach((t) => observer.observe(t.el));
})();
