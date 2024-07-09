/**
 * Функция для проверки длины строки.
 * Она принимает строку, которую нужно проверить, и максимальную длину и возвращает true,
 * если строка меньше или равна указанной длине, и false, если строка длиннее.
 * Эта функция нам пригодится для валидации формы.
 * @param str
 * @param maxLength
 * @returns {boolean}
 */

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

// Строка короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

/**
 * Функция для проверки, является ли строка палиндромом.
 * Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.
 * @param str
 * @returns {boolean}
 */

function isPalindrome(str) {
  const cleaned = str.replaceAll(' ', '').toLowerCase();
  const half = Math.floor(cleaned.length / 2);

  for (let i = 0; i < cleaned.length; i++) {
    if (i === half) {
      break;
    }

    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс'); // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true

/**
 * Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
 * Если в строке нет ни одной цифры, функция должна вернуть NaN.
 * @param stringOrNumber
 * @returns {number}
 */

function extractNumbers(stringOrNumber) {
  const str = String(stringOrNumber);

  let result = '';

  for (let i = 0; i < str.length; i++) {
    if (/[0-9]/.test(str[i])) {
      result += str[i];
    }
  }

  return parseInt(result, 10);
}

extractNumbers('2023 год'); // 2023
extractNumbers('ECMAScript 2022'); // 2022
extractNumbers('1 кефир, 0.5 батона'); // 105
extractNumbers('агент 007'); // 7
extractNumbers('а я томат'); // NaN
extractNumbers(2023); // 2023
extractNumbers(-1); // 1
extractNumbers(1.5); // 15

/**
 * Принимает строку в часовом формате и возвращает массив в формате [часы, минуты], где элементы массива - это numbers
 * @param clock
 * @returns {*}
 */

const parseClock = (clock) => {
  const arr = clock.split(':');
  return arr.map((str) => parseInt(str, 10));
};

/**
 * Принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах.
 * Возвращает true, если встреча не выходит за рамки рабочего дня, и false, если выходит.
 * @param workStart
 * @param workEnd
 * @param meetingStart
 * @param meetingDuration
 * @returns {boolean}
 */

const checkMeetingTime = (workStart, workEnd, meetingStart, meetingDuration) => {
  const parsedWorkStart = parseClock(workStart);
  const parsedWorkEnd = parseClock(workEnd);
  const parsedMeetingStart = parseClock(meetingStart);

  if (parsedWorkStart[0] > parsedMeetingStart[0]) {
    return false;
  } else if (parsedWorkStart[0] === parsedMeetingStart[0] && parsedWorkStart[1] > parsedMeetingStart[1]) {
    return false;
  }

  const meetingHours = Math.floor(meetingDuration / 60);
  const meetingMinutes = meetingDuration - meetingHours * 60;
  const parsedMeetingEnd = [
    parsedMeetingStart[0] + meetingHours,
    parsedMeetingStart[1] + meetingMinutes,
  ];

  if (parsedMeetingEnd[0] > parsedWorkEnd[0]) {
    return false;
  } else if (parsedMeetingEnd[0] === parsedWorkEnd[0] && parsedMeetingEnd[1] > parsedWorkEnd[1]) {
    return false;
  }

  return true;
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
