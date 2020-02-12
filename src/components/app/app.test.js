import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';

const offersCount = 312;

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

it(`Компонент App рендерится корректно`, () => {
  const tree = renderer
    .create(
        <App
          offersCount={offersCount}
          offerTitles={offerTitles}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
