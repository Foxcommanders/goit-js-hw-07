import { galleryItems } from './gallery-items.js';

const cardList = document.querySelector('.gallery');
const galleryList = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join('');

cardList.insertAdjacentHTML('afterbegin', galleryList);
cardList.addEventListener('click', handleImgClick);

function handleImgClick(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  const currentList = e.target.closest('.gallery__image');
  const sourceList = currentList.dataset.source;
  const currentDescr = currentList.alt;

  const instance = basicLightbox.create(`
    <img
    src="${sourceList}"
    alt="${currentDescr}"
  />
`);
  instance.show();
  document.addEventListener('keydown', e =>
    e.key === 'Escape' ? instance.close() : null
  );
}
