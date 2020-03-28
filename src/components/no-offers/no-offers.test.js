import React from 'react';
import renderer from 'react-test-renderer';

import NoOffers from './no-offers.jsx';

const city = `Amsterdam`;

it(`Компонент «NoOffers» рендерится корректно`, () => {
  const tree = renderer
    .create(<NoOffers city={city}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
