import {reducer} from '../reducer/reducer';
import {ActionType} from '../action-creator/action-creator';

const offers = {};

const newOffers = {
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

const newCity = {
  name: `Paris`,
  coords: [48.85341, 2.3488],
};

const currentSortingOption = {
  label: `Popular`,
  value: `popular`,
};

const newSortingOption = {
  label: `Price: low to high`,
  value: `priceLowToHigh`,
};

describe(`Редьюсер работает корректно`, () => {
  it(`Редьюсер изменяет текущий город на переданное значение`, () => {
    expect(reducer({
      currentCity,
    }, {
      type: ActionType.CHANGE_CITY,
      payload: newCity,
    })).toEqual({
      currentCity: newCity,
    });
  });

  it(`Редьюсер изменяет список предложений об аренде на переданное значение`, () => {
    expect(reducer({
      offers,
    }, {
      type: ActionType.GET_OFFERS,
      payload: newOffers,
    })).toEqual({
      offers: newOffers,
    });
  });

  it(`Редьюсер изменяет текущий вариант сортировки на переданное значение`, () => {
    expect(reducer({
      currentSortingOption,
    }, {
      type: ActionType.CHANGE_SORTING_OPTION,
      payload: newSortingOption,
    })).toEqual({
      currentSortingOption: newSortingOption,
    });
  });

  it(`Редьюсер изменяет активное предложение об аренде на переданное значение`, () => {
    expect(reducer({
      activeOfferId: 1,
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: 2,
    })).toEqual({
      activeOfferId: 2,
    });
  });
});
