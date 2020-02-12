import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

const offersCount = 312;

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

it(`Компонент Main рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Main
          offersCount={offersCount}
          offerTitles={offerTitles}
          onOfferTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
