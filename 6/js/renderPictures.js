const renderPictures = (photos) => {
  const template = document.querySelector('#picture').content;
  const templateContent = template.querySelector('.picture');
  const container = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    const {comments, description, likes, url} = photos[i];
    const clone = templateContent.cloneNode(true);

    const img = clone.querySelector('.picture__img');
    img.src = url;
    img.alt = description;
    const likesElement = clone.querySelector('.picture__likes');
    likesElement.textContent = likes;
    const commentsElement = clone.querySelector('.picture__comments');
    commentsElement.textContent = comments.length;

    fragment.appendChild(clone);
  }

  container.appendChild(fragment);
};

export {renderPictures};
