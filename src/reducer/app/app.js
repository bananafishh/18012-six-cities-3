import {extend} from '../../utils';
import {SORTING_OPTIONS} from '../../constants';

const initialState = {
  currentCity: ``,
  currentSortingOption: SORTING_OPTIONS[0],
};

const ActionType = {
  SET_CURRENT_CITY: `SET_CURRENT_CITY`,
  CHANGE_CURRENT_CITY: `CHANGE_CURRENT_CITY`,
  CHANGE_SORTING_OPTION: `CHANGE_SORTING_OPTION`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
};

const ActionCreator = {
  setCurrentCity: (offers) => ({
    type: ActionType.SET_CURRENT_CITY,
    payload: offers[0].city.name,
  }),
  changeCurrentCity: (city) => ({
    type: ActionType.CHANGE_CURRENT_CITY,
    payload: city,
  }),
  changeSortingOption: (option) => ({
    type: ActionType.CHANGE_SORTING_OPTION,
    payload: option,
  }),
  changeActiveOffer: (offerId) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: offerId,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_CITY:
      return extend(state, {currentCity: action.payload});

    case ActionType.CHANGE_CURRENT_CITY:
      return extend(state, {currentCity: action.payload});

    case ActionType.CHANGE_SORTING_OPTION:
      return extend(state, {currentSortingOption: action.payload});

    case ActionType.CHANGE_ACTIVE_OFFER:
      return extend(state, {activeOfferId: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer};
