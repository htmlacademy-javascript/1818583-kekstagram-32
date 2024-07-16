import {PHOTOS_COUNT} from './constants';
import {generatePhotos} from './data';
import {renderPictures} from './renderPictures';

const photos = generatePhotos(PHOTOS_COUNT);

renderPictures(photos);
