export const AuthStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const Offer = {
  RATING_MAX: 5,
  IMAGES_MAX: 6,
  REVIEWS_MAX: 10,
  REVIEW_LENGTH_MIN: 50,
  REVIEW_LENGTH_MAX: 300,
  NEARBY_OFFERS_MAX: 3,
};

export const PlaceType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`,
};

export const DateFormat = {
  FULL: `MMMM DD, YYYY`,
  WITH_DASHES: `YYYY-MM-DD`,
};

export const SortingOption = {
  POPULAR: `popular`,
  PRICE_LOW_TO_HIGH: `priceLowToHigh`,
  PRICE_HIGH_TO_LOW: `priceHighToLow`,
  TOP_RATED_FIRST: `topRatedFirst`,
};

export const BASE_URL = `https://htmlacademy-react-3.appspot.com/six-cities`;

export const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export const SORTING_OPTIONS = [
  {
    label: `Popular`,
    value: SortingOption.POPULAR,
  },
  {
    label: `Price: low to high`,
    value: SortingOption.PRICE_LOW_TO_HIGH,
  },
  {
    label: `Price: high to low`,
    value: SortingOption.PRICE_HIGH_TO_LOW,
  },
  {
    label: `Top rated first`,
    value: SortingOption.TOP_RATED_FIRST,
  },
];
