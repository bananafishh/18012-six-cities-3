import {reducer} from '../reducer/reducer';
import {ActionType} from '../action-creator/action-creator';

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

const currentOffers = [
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
  {
    id: 2,
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    pictures: [`https://placeimg.com/260/200/arch/2`],
    rating: 3.9,
    isPremium: false,
    isBookmarked: true,
  }
];

const newOffers = [
  {
    id: 3,
    title: `Cozy Parkside Studio in the ❤ of the East Village`,
    type: `hotel`,
    price: 500,
    pictures: [`https://placeimg.com/260/200/arch/3`],
    rating: 5,
    isPremium: true,
    isBookmarked: true,
  },
  {
    id: 4,
    title: `Sunny, Modern room in East Village!`,
    type: `room`,
    price: 80,
    pictures: [`https://placeimg.com/260/200/arch/4`],
    rating: 2.5,
    isPremium: false,
    isBookmarked: false,
  },
];

const currentCity = {
  name: `Amsterdam`,
  coords: [52.37403, 4.88969],
};

const newCity = {
  name: `Paris`,
  coords: [48.85341, 2.3488],
};

describe(`Редьюсер работает корректно`, () => {
  it(`Редьюсер изменяет текущий город на переданное значение`, () => {
    expect(reducer({
      currentCity,
      currentOffers,
      offers,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: newCity,
    })).toEqual({
      currentCity: newCity,
      currentOffers,
      offers,
    });
  });

  it(`Редьюсер изменяет текущие предложения об аренде на переданное значение`, () => {
    expect(reducer({
      currentCity,
      currentOffers,
      offers,
    }, {
      type: ActionType.FILTER_OFFERS,
      payload: newOffers,
    })).toEqual({
      currentCity,
      currentOffers: newOffers,
      offers,
    });
  });
});
