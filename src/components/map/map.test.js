import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';

const city = {
  name: `Dusseldorf`,
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13,
  },
};

const offers = [
  {
    id: 1,
    city,
    location: {
      latitude: 51.216402,
      longitude: 6.758314,
      zoom: 16,
    },
  },
  {
    id: 2,
    city,
    location: {
      latitude: 51.211402,
      longitude: 6.756314000000001,
      zoom: 16,
    },
  },
  {
    id: 3,
    city,
    location: {
      latitude: 50.844556999999995,
      longitude: 4.346697,
      zoom: 16,
    },
  },
  {
    id: 4,
    city,
    location: {
      latitude: 51.210402,
      longitude: 6.798314,
      zoom: 16,
    },
  },
];

const activeOfferId = 4;

it(`Компонент «Map» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Map
          offers={offers}
          activeOfferId={activeOfferId}
        />,
        {createNodeMock: () => document.createElement(`div`)}
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
