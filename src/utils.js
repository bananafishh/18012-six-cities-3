import {MONTHS, RATING_MAX} from './constants';

export const getRatingInPercent = (currentRating) => Math.round(currentRating / RATING_MAX * 100);

const addZeroTo = (number) => number < 10 ? `0${number}` : String(number);

export const formatDateToString = (date, format) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const formattedMonth = addZeroTo(month + 1);
  const formattedDay = addZeroTo(date.getDate());

  switch (format) {
    case `MMMM DD, YYYY`:
      return `${MONTHS[month]} ${formattedDay}, ${year}`;

    case `YYYY-MM-DD`:
      return `${year}-${formattedMonth}-${day}`;

    default:
      return `${formattedMonth}.${formattedDay}.${year}`;
  }
};

export const extend = (a, b) => Object.assign({}, a, b);

export const pluralizeWord = (word, count) => count > 1 ? `${word}s` : `${word}`;
