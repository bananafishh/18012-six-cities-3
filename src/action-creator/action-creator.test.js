import {ActionType, ActionCreator} from './action-creator';

const offers = {
  Amsterdam: {
    city: {
      name: `Amsterdam`,
      coords: [52.37403, 4.88969],
    },
    offers: [
      {
        id: 1,
        title: `Luxe 1-Bedroom Flat Near Manhattan`,
        type: `apartment`,
        price: 120,
        pictures: [`https://placeimg.com/260/200/arch/1`],
        rating: 4.5,
        isPremium: true,
        isBookmarked: false,
      },
    ],
  },
};

const currentCity = {
  name: `Amsterdam`,
  coords: [52.37403, 4.88969],
};

describe(`Action creators работают корректно`, () => {
  it(`Action creator для изменения текущего города возвращает правильный action`, () => {
    expect(ActionCreator.changeCity(currentCity)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: currentCity,
    });
  });

  it(`Action creator для получения списка предложений об аренде возвращает правильный action`, () => {
    expect(ActionCreator.getOffers(offers)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: offers,
    });
  });
});
