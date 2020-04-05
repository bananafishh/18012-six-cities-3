import MockAdapter from "axios-mock-adapter";

import {createApi} from '../../api';
import {reducer, ActionType, Operation, ActionCreator} from './data';
import {ActionType as AppActionType} from '../app/app';
import OffersDataAdapter from '../../adapters/offers-data-adapter';

const api = createApi(() => {});

const apiOffers = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': `Amsterdam`,
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`,
    },
    'id': 1,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': false,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 120,
    'rating': 4.8,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`,
  },
];

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

describe(`Загрузка данных с сервера происходит корректно`, () => {
  it(`Происходит корректный GET запрос к API по адресу /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadOffers();
    const adaptedOffers = OffersDataAdapter.parseOffers(apiOffers);

    apiMock
      .onGet(`/hotels`)
      .reply(200, apiOffers);

    return loadOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffers,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.SET_CURRENT_CITY,
          payload: adaptedOffers[0].city.name,
        });
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


