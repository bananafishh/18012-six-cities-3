import {extend} from '../../utils';
import {ActionCreator as AppActionCreator} from '../app/app';
import OffersDataAdapter from '../../adapters/offers-data-adapter';

const initialState = {
  offers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = OffersDataAdapter.parseOffers(response.data);

        dispatch(ActionCreator.loadOffers(offers));
        dispatch(AppActionCreator.setCurrentCity(offers));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {offers: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, Operation, reducer};
