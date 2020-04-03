import React from 'react';
import renderer from 'react-test-renderer';

import CitiesList from './cities-list';

const cities = [`Amsterdam`, `Paris`, `Brussels`];

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
