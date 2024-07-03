const PHOTOS_COUNT = 25;

/**
 * Генерирует случайное позитивное число в диапазоне от минимального до максимального включительно
 * Массив exclude позволяет указать числа, которые нужно исключить из результата
 * Если число выходит за рамки диапазона, то вернет -1
 * @param min
 * @param max
 * @param exclude
 * @returns {number}
 */

const getRandomPositiveInteger = (min, max, exclude = []) => {
  if (min > max || exclude.length > max - min) {
    return -1;
  }

  if (min === max) {
    return min;
  }

  let result;

  do {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  } while (exclude.includes(result));

  return result;
};

/**
 * Возвращает массив из определенного количества элементов исходного массива
 * Элементы не будут повторяться
 * @param elements
 * @param count
 * @returns {*[]}
 */

const getRandomArrayElements = (elements, count = 1) => {
  const usedIndices = [];

  for (let i = 0; i < count; i++) {
    const index = getRandomPositiveInteger(0, elements.length - 1, usedIndices);
    usedIndices.push(index);
  }

  return usedIndices.map((index) => elements[index]);
};

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

let generatedCommentIdList = [];

const generateComment = () => {
  const id = getRandomPositiveInteger(0, 999, generatedCommentIdList);
  generatedCommentIdList.push(id);
  let count = Math.ceil(Math.random() * 3);
  if (count === 3) {
    // снижаем вероятность появления двух комментариев вместо одного
    count = 1;
  }
  const messages = getRandomArrayElements(commentsList, count);
  let message = '';
  messages.forEach((text, index) => {
    if (index > 0) {
      message += ` ${text}`;
    } else {
      message += text;
    }
  });

  return {
    id,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message,
    name: getRandomArrayElements(authorNamesList)[0],
  };
};

let generatedIdList = [];
let generatedPhotoIdList = [];

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
    description: `Я заснял это!${phrase}`,
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: commentsLength}, generateComment),
  };
};

const generatePhotoList = () => {
  const result = Array.from({length: PHOTOS_COUNT}, generatePhoto);
  generatedCommentIdList = [];
  generatedIdList = [];
  generatedPhotoIdList = [];
  return result;
};

generatePhotoList();
