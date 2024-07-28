import {COMMENTS_PER_LOAD} from './constants';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const image = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialCommentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const socialCommentsContainer = bigPicture.querySelector('.social__comments');
const socialCommentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialCommentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const clearComments = () => {
  const elements = socialCommentsContainer.querySelectorAll('.social__comment');
  elements.forEach((comment) => {
    comment.remove();
  });
};

const closeModal = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeModalByKey);
};

function closeModalByKey(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

closeButton.addEventListener('click', closeModal);

let commentsData = [];

let page = 0;

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  const fromIndex = page * COMMENTS_PER_LOAD;
  const toIndex = fromIndex + COMMENTS_PER_LOAD;
  const showedComments = Math.min(toIndex, comments.length);
  const slice = comments.slice(fromIndex, toIndex);

  slice.forEach((comment) => {
    const {avatar, name, message} = comment;
    const element = socialCommentTemplate.cloneNode(true);
    const imgElement = element.querySelector('.social__picture');
    const textElement = element.querySelector('.social__text');
    imgElement.src = avatar;
    imgElement.alt = name;
    textElement.textContent = message;
    fragment.appendChild(element);
  });

  socialCommentsContainer.appendChild(fragment);
  socialCommentsShownCount.textContent = String(showedComments);

  if (comments.length <= toIndex) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const loadMore = () => {
  page++;
  renderComments(commentsData);
};

const renderBigPicture = (data) => {
  commentsData = data.comments;
  clearComments();

  page = 0;
  document.addEventListener('keydown', closeModalByKey);

  const {url, description, likes, comments} = data;

  image.src = url;
  image.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  socialCommentsTotalCount.textContent = String(comments.length);

  renderComments(comments);

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

commentsLoader.addEventListener('click', loadMore);

export {renderBigPicture};
