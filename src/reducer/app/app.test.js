import {reducer, ActionType, ActionCreator} from './app';

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

const city = `Paris`;
const newCity = `Cologne`;

const sortingOption = {
  label: `Popular`,
  value: `popular`,
};

const newSortingOption = {
  label: `Price: low to high`,
  value: `priceLowToHigh`,
};

const activeOfferId = 1;
const newActiveOfferId = 2;

describe(`Редьюсер «app» работает корректно`, () => {
  it(`Возвращает начальный стейт, если вызван без параметров`, () => {
    expect(reducer(void 0, {})).toEqual({
      currentCity: ``,
      currentSortingOption: sortingOption,
    });
  });

  it(`Устанавливает начальное значение активного города`, () => {
    expect(reducer({
      currentCity: {},
    }, {
      type: ActionType.SET_CURRENT_CITY,
      payload: city,
    })).toEqual({
      currentCity: city,
    });
  });

  it(`Изменяет активный город на переданное значение`, () => {
    expect(reducer({
      currentCity: city,
    }, {
      type: ActionType.CHANGE_CURRENT_CITY,
      payload: newCity,
    })).toEqual({
      currentCity: newCity,
    });
  });

  it(`Изменяет текущий вариант сортировки на переданное значение`, () => {
    expect(reducer({
      currentSortingOption: sortingOption,
    }, {
      type: ActionType.CHANGE_SORTING_OPTION,
      payload: newSortingOption,
    })).toEqual({
      currentSortingOption: newSortingOption,
    });
  });

  it(`Изменяет активное предложение об аренде на переданное значение`, () => {
    expect(reducer({
      activeOfferId,
    }, {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: newActiveOfferId,
    })).toEqual({
      activeOfferId: newActiveOfferId,
    });
  });
});

describe(`Action creator работает корректно`, () => {
  it(`Action creator для установки начального значения активного города возвращает правильный action`, () => {
    expect(ActionCreator.setCurrentCity(offers)).toEqual({
      type: ActionType.SET_CURRENT_CITY,
      payload: city,
    });
  });

  it(`Action creator для изменения текущего города возвращает правильный action`, () => {
    expect(ActionCreator.changeCurrentCity(city)).toEqual({
      type: ActionType.CHANGE_CURRENT_CITY,
      payload: city,
    });
  });

  it(`Action creator для изменения варианта сортировки предложений об аренде возвращает правильный action`, () => {
    expect(ActionCreator.changeSortingOption(sortingOption)).toEqual({
      type: ActionType.CHANGE_SORTING_OPTION,
      payload: sortingOption,
    });
  });

  it(`Action creator для изменения активного предложения об аренде возвращает правильный action`, () => {
    expect(ActionCreator.changeActiveOffer(activeOfferId)).toEqual({
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: activeOfferId,
    });
  });
});
