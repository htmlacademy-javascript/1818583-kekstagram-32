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

export {getRandomArrayElement, getRandomPositiveInteger};
