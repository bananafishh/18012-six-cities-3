import React from 'react';
import renderer from 'react-test-renderer';

import {CitiesList} from './cities-list';

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

it(`Компонент «CitiesList» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <CitiesList
          offers={offers}
          currentCity={currentCity}
          onCityChange={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
