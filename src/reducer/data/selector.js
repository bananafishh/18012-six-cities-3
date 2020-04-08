import {createSelector} from 'reselect';

import NameSpace from '../name-space';
import {SortingOption} from '../../constants';
import {getCurrentCity, getCurrentSortingOption} from '../app/selector';

const getOffers = (state) => state[NameSpace.DATA].offers;

export const getFavoriteOffers = (state) => state[NameSpace.DATA].favoriteOffers;

export const getOffersByCity = createSelector(
    getOffers,
    getCurrentCity,
    (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity)
);

export const getSortedOffers = createSelector(
    getOffersByCity,
    getCurrentSortingOption,
    (offers, currentSortingOption) => {
      switch (currentSortingOption.value) {
        case SortingOption.PRICE_LOW_TO_HIGH:
          return [...offers].sort((a, b) => a.price - b.price);

        case SortingOption.PRICE_HIGH_TO_LOW:
          return [...offers].sort((a, b) => b.price - a.price);

        case SortingOption.TOP_RATED_FIRST:
          return [...offers].sort((a, b) => b.rating - a.rating);

        default:
          return offers;
      }
    }
);

export const getCities = createSelector(
    getOffers,
    (offers) => {
      const cities = offers.map((offer) => offer.city.name);
      const uniqueCities = new Set(cities);

      return Array.from(uniqueCities);
    }
);

export const getFavoriteCities = createSelector(
    getFavoriteOffers,
    (offers) => {
      const cities = offers.map((offer) => offer.city.name);
      const uniqueCities = new Set(cities);

      return Array.from(uniqueCities);
    }
);

const getOfferId = (state, offerProps) => offerProps.id;

export const getOffer = createSelector(
    getOffers,
    getOfferId,
    (offers, id) => offers.find((offer) => offer.id === id)
);

export const getReviews = (state) => state[NameSpace.DATA].reviews;

export const getNearbyOffers = (state) => state[NameSpace.DATA].nearbyOffers;

export const getReviewPostingStatus = (state) => state[NameSpace.DATA].isReviewPosting;

export const getReviewPostingError = (state) => state[NameSpace.DATA].isReviewPostingError;
