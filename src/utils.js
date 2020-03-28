import {MONTHS, RATING_MAX, SortingOption} from './constants';

export const getRatingInPercent = (currentRating) => Math.round(currentRating / RATING_MAX * 100);

function addZeroTo(number) {
  return number < 10 ? `0${number}` : String(number);
}

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

export const sortOffers = (offers, sortingOption) => {
  switch (sortingOption) {
    case SortingOption.PRICE_LOW_TO_HIGH:
      return [...offers].sort((a, b) => a.price - b.price);

    case SortingOption.PRICE_HIGH_TO_LOW:
      return [...offers].sort((a, b) => b.price - a.price);

    case SortingOption.TOP_RATED_FIRST:
      return [...offers].sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
};

export const getCities = (state) => Object.keys(state.offers).map((cityName) => state.offers[cityName].city);

export const getCityOffers = (state) => state.offers[state.currentCity.name].offers;

export const getSortedOffers = (state) => {
  const offers = getCityOffers(state);

  return sortOffers(offers, state.currentSortingOption.value);
};

export const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  return sortedArr1.every((item, index) => (
    item === sortedArr2[index]
  ));
};
