import {renderBigPicture} from './renderBigPicture';
import {savedPhotos} from './picturesFilter';

const container = document.querySelector('.pictures');

const onPhotoClick = (e) => {
  const link = e.target.closest('a');

  if (link) {
    const photoData = savedPhotos.find((photo) => String(photo.id) === link.dataset.photoId);
    renderBigPicture(photoData);
  }
};

const renderPictures = (photos) => {
  const template = document.querySelector('#picture').content;
  const templateContent = template.querySelector('.picture');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const {comments, description, likes, url, id} = photos[i];
    const clone = templateContent.cloneNode(true);

    const img = clone.querySelector('.picture__img');
    img.src = url;
    img.alt = description;
    const likesElement = clone.querySelector('.picture__likes');
    likesElement.textContent = likes;
    const commentsElement = clone.querySelector('.picture__comments');
    commentsElement.textContent = comments.length;
    clone.dataset.photoId = id;

    fragment.appendChild(clone);
  }

  container.appendChild(fragment);
  container.addEventListener('click', onPhotoClick);
};

const removePictures = () => {
  const pictures = container.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

export {renderPictures, removePictures};
