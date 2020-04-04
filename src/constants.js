export const RATING_MAX = 5;

export const REVIEWS_ON_PAGE_MAX = 10;

export const NEARBY_OFFERS_MAX = 3;

export const OFFER_IMAGES_MAX = 6;

export const PlaceType = {
  APARTMENT: `Apartment`,
  ROOM: `Private Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`,
};

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

export const AuthorizationStatus = {
  AUTHORIZED: `AUTHORIZED`,
  UNAUTHORIZED: `UNAUTHORIZED`,
};
