import {extend} from '../utils';
import {ActionType} from '../action-creator/action-creator';

import offers from '../mocks/offers';

const cities = Object.keys(offers);
const currentCity = offers[cities[0]].city;
const currentOffers = offers[currentCity.name].offers;

const initialState = {
  currentCity,
  currentOffers,
  offers,
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

export {reducer};
