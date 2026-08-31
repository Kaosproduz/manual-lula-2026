// gallery.js — lightbox: clique num thumb da galeria abre a imagem ampliada.
// Thumbs com o mesmo data-group abrem em carrossel (setas, contador, baixar todas).

(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  const counter = lightbox.querySelector('.lightbox__counter');
  const downloadAllBtn = lightbox.querySelector('.lightbox__download-all');

  let group = null;
  let groupIndex = 0;

  const toggleGroupControls = (show) => {
    [prevBtn, nextBtn, counter, downloadAllBtn].forEach((el) => {
      if (el) el.hidden = !show;
    });
  };

  const render = () => {
    const item = group[groupIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption || '';
    lightboxCaption.textContent = item.caption || '';
    if (counter) counter.textContent = (groupIndex + 1) + ' / ' + group.length;
  };

  const open = (src, caption, groupItems, index) => {
    if (groupItems && groupItems.length > 1) {
      group = groupItems;
      groupIndex = index;
      toggleGroupControls(true);
      render();
    } else {
      group = null;
      lightboxImg.src = src;
      lightboxImg.alt = caption || '';
      lightboxCaption.textContent = caption || '';
      toggleGroupControls(false);
    }
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
    group = null;
  };

  const showNext = () => {
    if (!group) return;
    groupIndex = (groupIndex + 1) % group.length;
    render();
  };

  const showPrev = () => {
    if (!group) return;
    groupIndex = (groupIndex - 1 + group.length) % group.length;
    render();
  };

  document.querySelectorAll('.gallery__item').forEach((item) => {
    item.addEventListener('click', () => {
      const fullSrc = item.dataset.full || item.querySelector('img').src;
      const caption = item.dataset.caption || '';
      const groupName = item.dataset.group;

      if (groupName) {
        const members = Array.from(document.querySelectorAll('.gallery__item[data-group="' + groupName + '"]'));
        const groupItems = members.map((m) => ({
          src: m.dataset.full || m.querySelector('img').src,
          caption: m.dataset.caption || '',
        }));
        open(fullSrc, caption, groupItems, members.indexOf(item));
      } else {
        open(fullSrc, caption);
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!group) return;
      // Downloads disparados um a um (com pequeno atraso) — navegadores
      // costumam bloquear/perguntar quando vários cliques de download
      // disparam no mesmo instante.
      group.forEach((item, i) => {
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = item.src;
          a.download = '';
          document.body.appendChild(a);
          a.click();
          a.remove();
        }, i * 350);
      });
    });
  }

  closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
})();
