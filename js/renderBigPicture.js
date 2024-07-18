const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelectorAll('.social__comment');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

function closeModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeModalByKey);
}

function closeModalByKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

closeButton.addEventListener('click', closeModal);

function renderBigPicture(data) {
  document.addEventListener('keydown', closeModalByKey);

  const {url, description, likes, comments} = data;

  image.src = url;
  image.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = String(likes);
  commentsTotalCount.textContent = String(comments.length);

  for (let i = 0; i < socialComments.length; i++) {
    if (!comments[i]) {
      continue;
    }
    const {avatar, name, message} = comments[i];
    const element = socialComments[i];
    const imgElement = element.querySelector('.social__picture');
    const textElement = element.querySelector('.social__text');
    imgElement.src = avatar;
    imgElement.alt = name;
    textElement.textContent = message;
  }

  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
}

export {renderBigPicture};
