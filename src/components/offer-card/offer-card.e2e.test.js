import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OfferCard from './offer-card';

configure({adapter: new Adapter()});

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

it(`При наведении на карточку предложения об аренде вызывается коллбэк, в который передаётся id предложения`, () => {
  const handleOfferCardHover = jest.fn();

  const offerCard = shallow(
      <OfferCard
        offer={offer}
        onOfferTitleClick={() => {}}
        onOfferCardHover={handleOfferCardHover}
      />
  );

  offerCard.simulate(`mouseenter`);

  expect(handleOfferCardHover).toHaveBeenCalledTimes(1);
  expect(handleOfferCardHover.mock.calls[0][0]).toBe(offer.id);
});

it(`При клике по заголовку карточки предложения об аренде вызывается коллбэк, в который передаётся id предложения`, () => {
  const handleOfferTitleClick = jest.fn();

  const offerCard = shallow(
      <OfferCard
        offer={offer}
        onOfferTitleClick={handleOfferTitleClick}
        onOfferCardHover={() => {}}
      />
  );

  const offerTitle = offerCard.find(`.place-card__name`);
  offerTitle.simulate(`click`);

  expect(handleOfferTitleClick).toHaveBeenCalledTimes(1);
  expect(handleOfferTitleClick.mock.calls[0][0]).toBe(offer.id);
});
