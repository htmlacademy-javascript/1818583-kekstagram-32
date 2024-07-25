import {COMMENTS_PER_LOAD} from './constants';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelectorAll('.social__comment');
const socialCommentTemplate = socialComments[0];
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');

const clearComments = () => {
  const elements = socialCommentsContainer.querySelectorAll('.social__comment');
  elements.forEach((comment) => {
    comment.remove();
  });
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeModalByKey = (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
};

closeButton.addEventListener('click', closeModal);
document.addEventListener('keydown', closeModalByKey);

let closure;

const renderBigPictureClosure = (data) => {
  let coefficient = 1;

  const renderComments = (comments) => {
    clearComments();

    let quantity = coefficient * COMMENTS_PER_LOAD;

    if (comments.length <= quantity) {
      commentsLoader.classList.add('hidden');
      quantity = comments.length;
    } else {
      commentsLoader.classList.remove('hidden');
    }

    for (let i = 0; i < quantity; i++) {
      const {avatar, name, message} = comments[i];
      const element = socialCommentTemplate.cloneNode(true);
      const imgElement = element.querySelector('.social__picture');
      const textElement = element.querySelector('.social__text');
      imgElement.src = avatar;
      imgElement.alt = name;
      textElement.textContent = message;

      socialCommentsContainer.appendChild(element);
    }

    socialCommentsShownCount.textContent = String(quantity);
  };

  const renderModal = () => {
    const {url, description, likes, comments} = data;

    image.src = url;
    image.alt = description;
    socialCaption.textContent = description;
    likesCount.textContent = String(likes);
    socialCommentsTotalCount.textContent = String(comments.length);

    coefficient = 1;
    renderComments(comments);

    body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  };

  const loadMore = () => {
    coefficient++;
    renderComments(data.comments);
  };

  return {
    renderModal,
    loadMore,
  };
};

const renderBigPicture = (data) => {
  closure = renderBigPictureClosure(data);
  closure.renderModal();
};

commentsLoader.addEventListener('click', () => {
  closure?.loadMore();
});

export {renderBigPicture};
