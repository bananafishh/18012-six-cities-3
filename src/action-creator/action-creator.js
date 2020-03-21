const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  CHANGE_SORTING_OPTION: `CHANGE_SORTING_OPTION`,
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
  })
};

export {ActionType, ActionCreator};

