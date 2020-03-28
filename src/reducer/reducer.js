import {extend} from '../utils';
import {SORTING_OPTIONS} from '../constants';
import {ActionType} from '../action-creator/action-creator';

import offers from '../mocks/offers';

const cities = Object.keys(offers);
const currentCity = offers[cities[0]].city;

const initialState = {
  offers,
  currentCity,
  currentSortingOption: SORTING_OPTIONS[0],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS:
      return extend(state, {offers: action.payload});

    case ActionType.CHANGE_CITY:
      return extend(state, {currentCity: action.payload});

    case ActionType.CHANGE_SORTING_OPTION:
      return extend(state, {currentSortingOption: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return extend(state, {activeOfferId: action.payload});

    default:
      return state;
  }
};

export {reducer};
