import React from 'react';
import renderer from 'react-test-renderer';

import OfferCard from './offer-card';

const offer = {
  id: 1,
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `apartment`,
  price: 120,
  pictures: [`https://placeimg.com/260/200/arch/1`],
  rating: 4.5,
  isPremium: true,
  isBookmarked: false,
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
