import React from 'react';
import renderer from 'react-test-renderer';

import DetailedOfferInfo from './detailed-offer-info';

const offer = {
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `apartment`,
  price: 120,
  pictures: [
    `https://placeimg.com/260/200/arch/1`,
    `https://placeimg.com/260/200/arch/2`,
    `https://placeimg.com/260/200/arch/3`,
    `https://placeimg.com/260/200/arch/4`,
    `https://placeimg.com/260/200/arch/5`,
    `https://placeimg.com/260/200/arch/6`,
  ],
  rating: 4.5,
  isPremium: true,
  isBookmarked: false,
  description: `This is a unique and lovely apartment located in the heart of the Manhattan. Its truly original interior design will help you to experience New-York's unforgettable charm.
    The apartment is very clean. It has high ceilings, TV set with a selection of movies to enjoy on a rainy day, hi-fi system, high speed wi-fi and a tiny but fully-equipped kitchenette.`,
  bedroomsCount: 1,
  guestsCountMax: 2,
  householdItems: [
    `Wi-Fi`,
    `Washing machine`,
    `Towels`,
    `Heating`,
    `Coffee machine`,
    `Kitchen`,
    `Dishwasher`,
    `Cabel TV`,
    `Fridge`,
  ],
  host: {
    picture: `https://api.adorable.io/avatars/128/1`,
    name: `Abott`,
    isSuper: true,
  },
};

it(`Компонент «DetailedOfferInfo» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <DetailedOfferInfo offer={offer}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
