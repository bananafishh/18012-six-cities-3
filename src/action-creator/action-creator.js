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
    payload: offersList[city.name].offers,
  }),
};

export {ActionType, ActionCreator};

