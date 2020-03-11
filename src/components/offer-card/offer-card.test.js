import React from 'react';
import renderer from 'react-test-renderer';

import OfferCard from './offer-card.jsx';

const offer = {
  id: 1,
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `Apartment`,
  price: 120,
  picture: `https://placeimg.com/260/200/arch/1`,
  rating: 4.5,
  isPremium: true,
};

it(`Компонент «OfferCard» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <OfferCard
          offer={offer}
          onOfferTitleClick={() => {}}
          onOfferCardHover={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
