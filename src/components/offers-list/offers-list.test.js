import React from 'react';
import renderer from 'react-test-renderer';

import OffersList from './offers-list';

const offers = [
  {
    id: 1,
    title: `Luxe 1-Bedroom Flat Near Manhattan`,
    type: `apartment`,
    price: 120,
    previewImage: `https://placeimg.com/260/200/arch/1`,
    rating: 4.5,
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 2,
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    previewImage: `https://placeimg.com/260/200/arch/2`,
    rating: 3.9,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: 3,
    title: `Cozy Parkside Studio in the ❤ of the East Village`,
    type: `hotel`,
    price: 500,
    previewImage: `https://placeimg.com/260/200/arch/3`,
    rating: 5,
    isPremium: true,
    isFavorite: true,
  },
  {
    id: 4,
    title: `Sunny, Modern room in East Village!`,
    type: `room`,
    price: 80,
    previewImage: `https://placeimg.com/260/200/arch/4`,
    rating: 2.5,
    isPremium: false,
    isFavorite: false,
  },
];

it(`Компонент «OffersList» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <OffersList
          offers={offers}
          onOfferTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
