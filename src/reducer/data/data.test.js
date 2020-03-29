import {reducer, ActionType, ActionCreator} from './data';

const offers = [
  {
    id: 1,
    city: {
      name: `Paris`,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    title: `Luxe 1-Bedroom Flat Near Manhattan`,
    type: `apartment`,
    price: 120,
    previewImage: `https://placeimg.com/260/200/arch/1`,
    rating: 4.5,
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 2,
    city: {
      name: `Cologne`,
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    previewImage: `https://placeimg.com/260/200/arch/2`,
    rating: 3.9,
    isPremium: false,
    isFavorite: true,
  },
];

describe(`Редьюсер «data» работает корректно`, () => {
  it(`Возвращает начальный стейт, если вызван без параметров`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
    });
  });

  it(`Изменяет список предложений об аренде на переданное значение`, () => {
    expect(reducer({
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
    });
  });
});

describe(`Action creator работает корректно`, () => {
  it(`Action creator для загрузки списка предложений об аренде возвращает правильный action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });
});
