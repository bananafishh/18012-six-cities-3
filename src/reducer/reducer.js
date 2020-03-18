import {extend} from '../utils';

import offers from '../mocks/offers';

const initialState = {
  city: offers[0].city,
  offers,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  FILTER_OFFERS: `FILTER_OFFERS`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return extend(state, {city: action.payload});

    case ActionType.FILTER_OFFERS:
      return extend(state, {offers: action.payload});

    default:
      return state;
  }
};

export {reducer, ActionType};
