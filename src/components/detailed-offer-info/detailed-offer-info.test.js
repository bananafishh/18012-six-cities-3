import React from 'react';
import renderer from 'react-test-renderer';

import DetailedOfferInfo from './detailed-offer-info';

const offers = [
  {
    id: 1,
    title: `Luxe 1-Bedroom Flat Near Manhattan`,
    type: `apartment`,
    price: 120,
    pictures: [`https://placeimg.com/260/200/arch/1`],
    rating: 4.5,
    isPremium: true,
    isBookmarked: false,
  },
  {
    id: 2,
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    pictures: [`https://placeimg.com/260/200/arch/2`],
    rating: 3.9,
    isPremium: false,
    isBookmarked: true,
  },
];

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
  reviews: [
    {
      id: 1,
      text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
      perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
      a great value and location.`,
      rating: 5,
      date: new Date(`2020-03-15`),
      user: {
        name: `Steven`,
        picture: `https://api.adorable.io/avatars/128/1`,
      },
    },
    {
      id: 2,
      text: `Apartment was very pretty and quaint! Location was excellent , very close to the main 
      sights in Porto. Abott greeted us and was very helpful, gave us some great tips.`,
      rating: 4,
      date: new Date(`2020-03-15`),
      user: {
        name: `Monica`,
        picture: `https://api.adorable.io/avatars/128/2`,
      },
    },
  ],
};

it(`Компонент «DetailedOfferInfo» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <DetailedOfferInfo
          offer={offer}
          nearbyOffers={offers}
          onNearbyOfferTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
