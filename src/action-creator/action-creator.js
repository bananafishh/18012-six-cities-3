const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  CHANGE_SORTING_OPTION: `CHANGE_SORTING_OPTION`,
  CHANGE_ACTIVE_OFFER: `CHANGE_ACTIVE_OFFER`,
};

const ActionCreator = {
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  changeSortingOption: (option) => ({
    type: ActionType.CHANGE_SORTING_OPTION,
    payload: option,
  }),
  changeActiveOffer: (offerId) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: offerId,
  })
};

export {ActionType, ActionCreator};

