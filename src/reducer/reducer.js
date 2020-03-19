import {extend} from '../utils';

import offers from '../mocks/offers';

const filterOffers = (offersList, city) => offersList[city.name].offers;

const cities = Object.keys(offers);
const currentCity = offers[cities[0]].city;
const currentOffers = filterOffers(offers, currentCity);

const initialState = {
  currentCity,
  currentOffers,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  FILTER_OFFERS: `FILTER_OFFERS`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  filterOffers: (offersList, city) => ({
    type: ActionType.FILTER_OFFERS,
    payload: filterOffers(offersList, city),
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {currentCity: action.payload});

    case ActionType.FILTER_OFFERS:
      return extend(state, {currentOffers: action.payload});

    default:
      return state;
  }
};

export {reducer, ActionType, ActionCreator};
