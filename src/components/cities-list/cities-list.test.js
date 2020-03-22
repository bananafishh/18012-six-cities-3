import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list';

const cities = [
  {
    name: `Amsterdam`,
    coords: [52.37403, 4.88969],
  },
  {
    name: `Paris`,
    coords: [48.85341, 2.3488],
  },
  {
    name: `Brussels`,
    coords: [50.85045, 4.34878],
  },
];

it(`Компонент «CitiesList» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={cities}
          currentCity={cities[0]}
          onCityChange={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
