import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main';

configure({adapter: new Adapter()});

const offers = [
  {
    id: 1,
    title: `Luxe 1-Bedroom Flat Near Manhattan`,
    type: `Apartment`,
    price: 120,
    picture: `https://placeimg.com/260/200/arch/1`,
    rating: 4.5,
    isPremium: true,
  },
  {
    id: 2,
    title: `Bright & Airy in Highland Park`,
    type: `Apartment`,
    price: 200,
    picture: `https://placeimg.com/260/200/arch/2`,
    rating: 3.9,
    isBookmarked: true,
  },
  {
    id: 3,
    title: `Cozy Parkside Studio in the ❤ of the East Village`,
    type: `Studio`,
    price: 500,
    picture: `https://placeimg.com/260/200/arch/3`,
    rating: 5,
    isPremium: true,
    isBookmarked: true,
  },
  {
    id: 4,
    title: `Sunny, Modern room in East Village!`,
    type: `Private room`,
    price: 80,
    picture: `https://placeimg.com/260/200/arch/4`,
    rating: 2.5,
  },
];

it(`При клике по заголовку карточки предложения об аренде вызывается коллбэк`, () => {
  const handleOfferTitleClick = jest.fn();

  const main = shallow(
      <Main
        offers={offers}
        onOfferTitleClick={handleOfferTitleClick}
      />
  );

  const offersTitles = main.find(`.place-card__name`);
  offersTitles.forEach((title) => title.simulate(`click`));

  expect(handleOfferTitleClick).toHaveBeenCalledTimes(offersTitles.length);
});
