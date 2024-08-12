import {removePictures, renderPictures} from './renderPictures';
import {debounce, getRandomArrayElements} from './util';
import {DEBOUNCE_TIME} from './constants';

const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

let savedPhotos = [];

const savePhotos = (data) => {
  savedPhotos = data;
};

const filterPictures = (id) => {
  removePictures();

  switch (id) {
    case 'filter-random': {
      renderPictures(getRandomArrayElements(savedPhotos, 10));
      break;
    }
    case 'filter-discussed': {
      renderPictures([...savedPhotos].sort((a, b) => b.comments.length - a.comments.length));
      break;
    }
    default: {
      renderPictures(savedPhotos);
    }
  }
};

const debouncedFilterPictures = debounce(filterPictures, DEBOUNCE_TIME);

filtersForm.addEventListener('click', (e) => {
  if (!e.target.closest('.img-filters__button')) {
    return;
  }

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  e.target.classList.add('img-filters__button--active');

  debouncedFilterPictures(e.target.id);
});


export {savePhotos, savedPhotos};
