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
  document.body.insertAdjacentElement('beforeend', successTemplate);
  const element = document.querySelector('.success');
  const successButton = element.querySelector('.success__button');
  successButton.addEventListener('click', () => {
    element.remove();
  });
};

const showErrorUploadMessage = () => {
  document.body.insertAdjacentElement('beforeend', errorTemplate);
  const element = document.querySelector('.error');
  const errorButton = element.querySelector('.error__button');
  errorButton.addEventListener('click', () => {
    console.log('wfwfvv');
    element.remove();
    openForm();
  });
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
