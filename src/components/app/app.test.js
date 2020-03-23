import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';

const mockStore = configureStore([]);

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
      {
        id: 2,
        title: `Bright & Airy in Highland Park`,
        type: `house`,
        price: 200,
        pictures: [`https://placeimg.com/260/200/arch/2`],
        rating: 3.9,
        isPremium: false,
        isBookmarked: true,
      },
    ],
  },
};

const currentCity = {
  name: `Amsterdam`,
  coords: [52.37403, 4.88969],
};

const currentSortingOption = {
  label: `Price: low to high`,
  value: `priceLowToHigh`,
};

it(`Компонент «App» рендерится корректно`, () => {
  const store = mockStore({
    offers,
    currentCity,
    currentSortingOption,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App/>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
