import React from 'react';
import renderer from 'react-test-renderer';

import {AuthStatus} from '../../constants';

import {DetailedOffer} from './detailed-offer';

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
];

const offer = {
  id: 1,
  city: {
    name: `Dusseldorf`,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `apartment`,
  price: 120,
  images: [
    `https://placeimg.com/260/200/arch/1`,
    `https://placeimg.com/260/200/arch/2`,
    `https://placeimg.com/260/200/arch/3`,
    `https://placeimg.com/260/200/arch/4`,
    `https://placeimg.com/260/200/arch/5`,
    `https://placeimg.com/260/200/arch/6`,
  ],
  rating: 4.5,
  isPremium: true,
  isFavorite: false,
  description: `This is a unique and lovely apartment located in the heart of the Manhattan. Its truly original interior design will help you to experience New-York's unforgettable charm.
  The apartment is very clean. It has high ceilings, TV set with a selection of movies to enjoy on a rainy day, hi-fi system, high speed wi-fi and a tiny but fully-equipped kitchenette.`,
  bedrooms: 1,
  maxAdults: 2,
  goods: [
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
    avatarUrl: `https://api.adorable.io/avatars/128/1`,
    name: `Abott`,
    isPro: true,
  },
};

const reviews = [
  {
    id: 1,
    text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
      perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
      a great value and location.`,
    rating: 5,
    date: `2019-04-03T14:13:56.569Z`,
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
    date: `2019-05-08T14:13:56.569Z`,
    user: {
      name: `Monica`,
      picture: `https://api.adorable.io/avatars/128/2`,
    },
  },
];

const isReviewPosting = false;

const isReviewPostingError = false;

it(`Компонент «DetailedOffer» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <DetailedOffer
          offer={offer}
          reviews={reviews}
          nearbyOffers={offers}
          authStatus={AuthStatus.AUTH}
          isReviewPosting={isReviewPosting}
          isReviewPostingError={isReviewPostingError}
          onNearbyOfferTitleClick={() => {}}
          onOfferDataLoad={() => {}}
          onReviewSend={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
