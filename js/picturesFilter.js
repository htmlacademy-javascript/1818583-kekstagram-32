import {removePictures, renderPictures} from './renderPictures';
import {debounce, getRandomArrayElements} from './util';
import {DEBOUNCE_TIME} from './constants';

let photos = [];

const savePhotos = (data) => {
  photos = data;
};

const filterPictures = (id) => {
  removePictures();

  switch (id) {
    case 'filter-random': {
      renderPictures(getRandomArrayElements(photos, 10));
      break;
    }
    case 'filter-discussed': {
      renderPictures([...photos].sort((a, b) => b.comments.length - a.comments.length));
      break;
    }
    default: {
      renderPictures(photos);
    }
  }
};

const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');

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


export {savePhotos};
