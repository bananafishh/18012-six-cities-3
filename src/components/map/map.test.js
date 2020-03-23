import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';

const offers = [
  {
    id: 1,
    coords: [52.3909553943508, 4.85309666406198],
  },
  {
    id: 2,
    coords: [52.369553943508, 4.85309666406198],
  },
  {
    id: 3,
    coords: [52.3909553943508, 4.929309666406198],
  },
  {
    id: 4,
    coords: [52.3809553943508, 4.939309666406198],
  },
];

it(`Компонент «Map» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Map
          center={offers[0].coords}
          offers={offers}
          activeOfferId={1}
        />,
        {createNodeMock: () => document.createElement(`div`)}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
