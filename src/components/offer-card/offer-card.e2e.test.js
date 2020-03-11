import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import OfferCard from './offer-card.jsx';

configure({adapter: new Adapter()});

const offer = {
  id: 1,
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `Apartment`,
  price: 120,
  picture: `https://placeimg.com/260/200/arch/1`,
  rating: 4.5,
  isPremium: true,
};

it(`При наведении на карточку предложения об аренде вызывается коллбэк, в который передаётся информация об объекте недвижимости`, () => {
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
