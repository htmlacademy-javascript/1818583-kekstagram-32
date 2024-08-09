import {API_URL, DEFAULT_PHOTO_SCALE, FILE_TYPES, MAX_HASHTAGS} from './constants';
import {resetFilter, scalePreviewImage} from './pictureEffectsManager';
import {showErrorUploadMessage, showSuccessUploadMessage} from './api';

const formInput = document.querySelector('.img-upload__input');
const imgUploadModal = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('#upload-select-image');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentsInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const previewImageElement = document.querySelector('.img-upload__preview').querySelector('img');

const defaultConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'pristine-error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(form, defaultConfig);

// Открытие и закрытие модального окна с загрузкой картинки

const openForm = () => {
  const file = formInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);
  }

  imgUploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', closeFormByKey);
};

formInput.addEventListener('change', openForm);

const closeForm = () => {
  imgUploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', closeFormByKey);
};

const resetForm = () => {
  scalePreviewImage(DEFAULT_PHOTO_SCALE);
  resetFilter();
  form.reset();
  pristine.reset();
};

function closeFormByKey(e) {
  if (e.target.classList.contains('text__hashtags') || e.target.classList.contains('text__description')) {
    return;
  }

  if (e.key === 'Escape') {
    closeForm();
    resetForm();
  }
}

closeButton.addEventListener('click', () => {
  closeForm();
  resetForm();
});

// Валидация формы

const convertHashtagStringToArray = (string) => string.split(' ').map((tag) => tag.trim()).filter((tag) => tag);

const validateHashtagRepeat = (string) => {
  const hashtags = string.split(' ').map((tag) => tag.trim().toLowerCase()).filter((tag) => tag);
  const mySet = new Set(hashtags);
  return mySet.size === hashtags.length;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagRepeat,
  'Хештеги повторяются',
  3,
  true,
);

const validateHashtagLength = (string) => {
  const array = convertHashtagStringToArray(string);
  return array.length <= MAX_HASHTAGS;
};

pristine.addValidator(
  hashtagsInput,
  validateHashtagLength,
  'Превышено максимальное количество хештегов',
  2,
  true,
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
  'Невалидный хештег',
  1,
  true,
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

  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  const formData = new FormData(e.target);

  fetch(
    API_URL,
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((res) => {
      if (res.ok) {
        resetForm();
        showSuccessUploadMessage();
      } else {
        showErrorUploadMessage();
      }
    })
    .catch(() => {
      showErrorUploadMessage();
    })
    .finally(() => {
      closeForm();
      submitButton.disabled = false;
    });
});

export {openForm};
