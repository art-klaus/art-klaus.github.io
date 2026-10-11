const image = (name) => `assets/images/${name}.webp`;

const works = [
  {
    id: 'mirror',
    title: 'Re-formed Mirror, Reclaimed by Nature',
    category: 'Mixed media · 01',
    cover: 'mirror-main',
    images: [
      ['mirror-main', 'Full view of Re-formed Mirror, Reclaimed by Nature'],
      ['mirror-detail', 'Detail of the mirror and natural material surface']
    ],
    description: [
      'Natural elements meet forgotten construction material on a broken IKEA canvas, emphasizing the imbalance between the two.',
      'Dirt, yerba mate with stems, gypsum powder, plaster, and latex adhesive form the surface. A fallen leaf shaped the centre of the work before falling from the canvas.'
    ],
    meta: 'Displayed in room T9-53, Mandeville, Erasmus University.'
  },
  {
    id: 'dune',
    title: 'Dune Dehydration',
    category: 'Sand and adhesive · 02',
    cover: 'dune-close',
    images: [
      ['dune-far', 'Installation view of Dune Dehydration'],
      ['dune-close', 'Close view of the sand surface of Dune Dehydration']
    ],
    description: [
      'A lonely desert whose only partner is the sun, shining on familiar faces. Sand from Delftshaven is mixed with adhesive so it remains fixed as it reflects the sun’s waves.'
    ],
    meta: 'Delftshaven, Rotterdam · 2025'
  },
  {
    id: 'anthropomorphic',
    title: 'Anthropomorphic Perspectives',
    category: 'Sculptural painting · 03',
    cover: 'anthropomorphic-after',
    images: [
      ['anthropomorphic-after', 'Completed Anthropomorphic Perspectives'],
      ['anthropomorphic-before', 'Initial carving of Anthropomorphic Perspectives before drawing and painting'],
      ['anthropomorphic-during', 'Anthropomorphic Perspectives during the making process']
    ],
    description: [
      'The chaotic flow of eyes across the canvas encourages viewers to remain in place as they feel observed by many.',
      'Made with Blanco de España, latex adhesive, and black acrylic paint. The process views show the initial carving before the eyes were drawn and the surface was painted.'
    ],
    meta: 'Vigo, Galicia · 2025'
  },
  {
    id: 'chaosiland',
    title: 'Chaosiland',
    category: 'Charcoal · 04',
    cover: 'chaosiland-close',
    images: [
      ['chaosiland-mid-range', 'Mid-range view of Chaosiland'],
      ['chaosiland-mid-close', 'Closer view of the marks in Chaosiland'],
      ['chaosiland-close', 'Close-up of the charcoal marks in Chaosiland']
    ],
    description: [
      'Windmill shapes create space for anthropomorphic faces to arise. With a long look, familiar objects and shapes come into being.',
      'Painted in Noordereiland during a social gathering called “Schilder/teken Atelier”. Material: charcoal.'
    ],
    meta: 'Noordereiland, Rotterdam · 2026'
  }
];

const variants = [
  { id: 1, name: 'Symmetric', cover: 'laminart-1-close', far: 'laminart-1-far', close: 'laminart-1-close' },
  { id: 2, name: 'Thin', cover: 'laminart-2-close', far: 'laminart-2-far', close: 'laminart-2-close' },
  { id: 3, name: 'Mid thin', cover: 'laminart-3-close', far: 'laminart-3-far', close: 'laminart-3-close', soldOut: true },
  { id: 4, name: 'Mid large', cover: 'laminart-4-close', far: 'laminart-4-far', close: 'laminart-4-close' },
  { id: 5, name: 'Large', cover: 'laminart-5-close', far: 'laminart-5-far', close: 'laminart-5-close' }
];

document.querySelectorAll('#year').forEach(el => { el.textContent = new Date().getFullYear(); });

function makeCard({ title, category, cover, href, workId }) {
  const card = document.createElement(href ? 'a' : 'button');
  card.className = 'work-card';
  if (href) card.href = href;
  else { card.type = 'button'; card.dataset.work = workId; card.setAttribute('aria-label', `View ${title}`); }
  card.innerHTML = `<div class="work-card-image"><img src="${image(cover)}" alt="${title}" loading="lazy"></div><div class="work-card-info"><div><h3>${title}</h3><p>${category}</p></div><span class="work-card-arrow" aria-hidden="true">↗</span></div>`;
  return card;
}

if (document.body.dataset.page === 'home') {
  const grid = document.getElementById('work-grid');
  works.forEach(work => grid.append(makeCard({ ...work, workId: work.id })));
  variants.forEach(variant => grid.append(makeCard({
    title: `LaminART — ${variant.name}`,
    category: `LaminART · variation 0${variant.id}${variant.soldOut ? ' · Sold out' : ''}`,
    cover: variant.cover,
    href: `laminart.html#variant-${variant.id}`
  })));

  const dialog = document.getElementById('work-dialog');
  const stage = document.getElementById('dialog-image');
  let activeWork = null;
  let imageIndex = 0;

  function showImage() {
    const [name, alt] = activeWork.images[imageIndex];
    stage.src = image(name);
    stage.alt = alt;
    document.getElementById('image-count').textContent = `${imageIndex + 1} / ${activeWork.images.length}`;
  }

  function openWork(work) {
    activeWork = work;
    imageIndex = 0;
    document.getElementById('dialog-kicker').textContent = work.category;
    document.getElementById('dialog-title').textContent = work.title;
    document.getElementById('dialog-description').replaceChildren(...work.description.map(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      return p;
    }));
    document.getElementById('dialog-meta').textContent = work.meta;
    showImage();
    dialog.showModal();
  }

  grid.addEventListener('click', event => {
    const card = event.target.closest('[data-work]');
    if (card) openWork(works.find(work => work.id === card.dataset.work));
  });
  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  document.getElementById('image-prev').addEventListener('click', () => { imageIndex = (imageIndex - 1 + activeWork.images.length) % activeWork.images.length; showImage(); });
  document.getElementById('image-next').addEventListener('click', () => { imageIndex = (imageIndex + 1) % activeWork.images.length; showImage(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (!activeWork) return;
    if (event.key === 'ArrowLeft') { imageIndex = (imageIndex - 1 + activeWork.images.length) % activeWork.images.length; showImage(); }
    if (event.key === 'ArrowRight') { imageIndex = (imageIndex + 1) % activeWork.images.length; showImage(); }
  });
}

if (document.body.dataset.page === 'laminart') {
  const tabs = document.getElementById('variant-tabs');
  const panel = document.getElementById('variant-panel');
  variants.forEach(variant => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.id = `variant-tab-${variant.id}`;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', 'variant-panel');
    tab.textContent = `${String(variant.id).padStart(2, '0')} ${variant.name}`;
    tab.dataset.variant = variant.id;
    tabs.append(tab);
  });

  function selectVariant(id, updateHash = true) {
    const variant = variants.find(item => item.id === Number(id)) || variants[0];
    tabs.querySelectorAll('[role="tab"]').forEach(tab => {
      const selected = Number(tab.dataset.variant) === variant.id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `variant-tab-${variant.id}`);
    panel.innerHTML = `<figure class="variant-main-image"><img src="${image(variant.far)}" alt="LaminART ${variant.name}, full installation view"><figcaption>Full view · ${variant.name}</figcaption></figure><figure class="variant-detail-image"><img src="${image(variant.close)}" alt="Close view of LaminART ${variant.name}"><figcaption>Surface detail · ${variant.name}</figcaption></figure><div class="variant-copy"><p class="eyebrow">Variation 0${variant.id} / 05${variant.soldOut ? ' · Sold out' : ''}</p><h2>${variant.name}</h2><p>One of five related LaminART works, shown here through its full view and a closer look at the surface.</p></div>`;
    if (updateHash) history.replaceState(null, '', `#variant-${variant.id}`);
  }

  tabs.addEventListener('click', event => {
    const tab = event.target.closest('[data-variant]');
    if (tab) selectVariant(tab.dataset.variant);
  });
  tabs.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = Number(tabs.querySelector('[aria-selected="true"]').dataset.variant) - 1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? variants.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + variants.length) % variants.length;
    selectVariant(variants[next].id);
    tabs.querySelector(`[data-variant="${variants[next].id}"]`).focus();
  });
  window.addEventListener('hashchange', () => selectVariant(location.hash.match(/^#variant-(\d)$/)?.[1], false));
  selectVariant(location.hash.match(/^#variant-(\d)$/)?.[1], false);
}
