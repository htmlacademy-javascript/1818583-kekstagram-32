import {getRandomArrayElement, getRandomPositiveInteger} from './util';

const commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const authorNamesList = [
  'Вася',
  'Иван',
  'Артём',
  'Катя',
  'Василиса',
  'Артемида',
  'Гоша',
  'Олежек',
  'Ирина',
  'Зевс',
];

const generateComments = (commentsLength) => {
  const generatedCommentIdList = [];

  const generateComment = () => {
    const id = getRandomPositiveInteger(0, 999, generatedCommentIdList);
    generatedCommentIdList.push(id);

    return {
      id,
      avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
      message: getRandomArrayElement(commentsList),
      name: getRandomArrayElement(authorNamesList),
    };
  };

  return Array.from({length: commentsLength}, generateComment);
};

const generatePhotos = (photosCount) => {
  const generatedIdList = [];
  const generatedPhotoIdList = [];

  const generatePhoto = () => {
    const id = getRandomPositiveInteger(1, 25, generatedIdList);
    generatedIdList.push(id);
    const photoId = getRandomPositiveInteger(1, 25, generatedPhotoIdList);
    generatedPhotoIdList.push(photoId);
    let phrase = '';
    if (photoId > 1) {
      phrase = ` Оно попало в кадр уже ${photoId === 2 ? 'во' : 'в'} ${photoId}-й раз!`;
    }
    const commentsLength = getRandomPositiveInteger(0, 30);

    return {
      id,
      url: `photos/${photoId}.jpg`,
      description: `Я ЗАСНЯЯЯЛ!${phrase}`,
      likes: getRandomPositiveInteger(15, 200),
      comments: generateComments(commentsLength),
    };
  };

  return Array.from({length: photosCount}, generatePhoto);
};

export {generatePhotos};
