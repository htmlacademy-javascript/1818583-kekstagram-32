import {MAX_HASHTAGS} from './constants';

const formInput = document.querySelector('.img-upload__input');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentsInput = form.querySelector('.text__description');

// Открытие и закрытие модального окна

formInput.addEventListener('change', () => {
  imgUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeFormByKey);
});

const closeForm = () => {
  imgUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormByKey);
  formInput.value = null;
  hashtagsInput.value = '';
  commentsInput.value = '';
};

function closeFormByKey(e) {
  if (e.key === 'Escape') {
    closeForm();
  }
}

closeButton.addEventListener('click', closeForm);

hashtagsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeFormByKey);
});

hashtagsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', closeFormByKey);
});

commentsInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', closeFormByKey);
});

commentsInput.addEventListener('blur', () => {
  document.addEventListener('keydown', closeFormByKey);
});

// Валидация формы

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'pristine-error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(form, defaultConfig);

const convertHashtagStringToArray = (string) => string.split(' ').map((tag) => tag.trim()).filter((tag) => tag);

const validateHashtagRepeat = (string) => {
  const hashtags = string.split(' ').map((tag) => tag.trim().toLowerCase()).filter((tag) => tag);
  const mySet = new Set(hashtags);
  return mySet.size === hashtags.length;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagRepeat,
  'Хештеги повторяются'
);

const validateHashtagLength = (string) => {
  const array = convertHashtagStringToArray(string);
  return array.length <= MAX_HASHTAGS;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagLength,
  'Превышено максимальное количество хештегов'
);

const validateHashtag = (string) => {
  const hashtags = convertHashtagStringToArray(string);

  let isValid = true;

  const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < hashtags.length; i++) {
    isValid = regexp.test(hashtags[i]);
  }

  return isValid;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtag,
  'Невалидный хештег'
);

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  commentsInput,
  validateComment,
  'Длина комментария не должна превышать 140 символов'
);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    closeForm();
  }
});
