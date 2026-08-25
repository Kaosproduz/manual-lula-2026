// main.js — navegação: scrollspy da sidebar (destaca item ativo conforme o scroll)

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

    // Se for um subitem, também destaca o grupo (capítulo) pai
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
