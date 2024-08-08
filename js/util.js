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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

/**
 * Выбирает случайные неповторяющиеся элементы массива
 * Не мутирует исходный массив
 * @param array
 * @param count
 * @returns {*|*[]}
 */

const getRandomArrayElements = (array, count) => {
  const result = [...array];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  if (result.length <= count) {
    return result;
  }

  return result.slice(0, count);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement, getRandomPositiveInteger, getRandomArrayElements, debounce};
