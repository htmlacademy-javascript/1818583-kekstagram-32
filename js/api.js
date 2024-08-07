import {renderPictures} from './renderPictures';
import {API_URL} from './constants';
import {openForm} from './formController';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const showDataErrorMessage = () => {
  document.body.insertAdjacentElement('beforeend', dataErrorTemplate);
  const element = document.querySelector('.data-error');
  setTimeout(() => {
    element.remove();
  }, 5000);
};

const showSuccessUploadMessage = () => {
  const cloned = successTemplate.cloneNode(true);
  const successButton = cloned.querySelector('.success__button');

  const closeModal = () => {
    document.removeEventListener('keydown', onEscape);
    cloned.remove();
  };

  function onEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  successButton.addEventListener('click', closeModal);
  document.body.insertAdjacentElement('beforeend', cloned);
  document.addEventListener('keydown', onEscape);
};

const showErrorUploadMessage = () => {
  const cloned = errorTemplate.cloneNode(true);
  const errorButton = cloned.querySelector('.error__button');

  const closeModal = () => {
    document.removeEventListener('keydown', onEscape);
    cloned.remove();
    openForm();
  };

  function onEscape(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  errorButton.addEventListener('click', closeModal);
  document.body.insertAdjacentElement('beforeend', cloned);
  document.addEventListener('keydown', onEscape);
};

const getData = () => {
  fetch(`${API_URL}/data`)
    .then((res) => res.json())
    .then((data) => {
      renderPictures(data);
    })
    .catch(() => {
      showDataErrorMessage();
    });
};

export {getData, showDataErrorMessage, showSuccessUploadMessage, showErrorUploadMessage};
