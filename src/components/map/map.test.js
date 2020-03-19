import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';

const coords = [
  [52.3909553943508, 4.85309666406198],
  [52.369553943508, 4.85309666406198],
  [52.3909553943508, 4.929309666406198],
  [52.3809553943508, 4.939309666406198],
];

it(`Компонент «Map» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Map center={coords[0]} coords={coords}/>,
        {createNodeMock: () => document.createElement(`div`)}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
