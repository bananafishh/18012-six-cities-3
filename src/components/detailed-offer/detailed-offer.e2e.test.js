import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthStatus} from '../../constants';

import {DetailedOffer} from './detailed-offer';

configure({adapter: new Adapter()});

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

const history = {
  push: () => {},
};

describe(`Компонент «DetailedOffer» работает корректно`, () => {
  it(`При клике по иконке закладки вызывается коллбэк, в который передаются id и статус «избранности» предложения об аренде`, () => {
    window.scrollTo = jest.fn();
    const handleBookmarkClick = jest.fn();

    const detailedOffer = shallow(
        <DetailedOffer
          id={offer.id}
          offer={offer}
          reviews={reviews}
          nearbyOffers={offers}
          authStatus={AuthStatus.AUTH}
          history={history}
          isReviewPosting={false}
          isReviewPostingError={false}
          onOfferDataLoad={() => {}}
          onReviewSend={() => {}}
          onBookmarkClick={handleBookmarkClick}
        />
    );

    const bookmarkButton = detailedOffer.find(`.property__bookmark-button`);

    bookmarkButton.simulate(`click`);
    expect(handleBookmarkClick).toHaveBeenCalledTimes(1);
    expect(handleBookmarkClick.mock.calls[0][0]).toBe(offer.id);
    expect(handleBookmarkClick.mock.calls[0][1]).toBe(offer.isFavorite);
  });
});
