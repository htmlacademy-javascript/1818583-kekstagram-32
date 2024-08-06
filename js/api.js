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
  console.log('kkkk');
  const cloned = successTemplate.cloneNode(true);
  const successButton = cloned.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    cloned.remove();
  });
  document.body.insertAdjacentElement('beforeend', cloned);
};

const showErrorUploadMessage = () => {
  const cloned = errorTemplate.cloneNode(true);
  const errorButton = cloned.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    cloned.remove();
    openForm();
  });
  document.body.insertAdjacentElement('beforeend', cloned);
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
