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

describe(`Компонент «OfferCard» работает корректно`, () => {
  it(`При наведении на карточку предложения об аренде вызывается коллбэк, в который передаётся id предложения`, () => {
    const handleHover = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          onTitleClick={() => {}}
          onHover={handleHover}
        />
    );

    offerCard.simulate(`mouseenter`);
    expect(handleHover).toHaveBeenCalledTimes(1);
    expect(handleHover.mock.calls[0][0]).toBe(offer.id);
  });

  it(`При клике по заголовку карточки предложения об аренде вызывается коллбэк, в который передаётся выбранное предложение`, () => {
    const handleTitleClick = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          onTitleClick={handleTitleClick}
          onHover={() => {}}
        />
    );

    const offerTitle = offerCard.find(`.place-card__name`);

    offerTitle.simulate(`click`);
    expect(handleTitleClick).toHaveBeenCalledTimes(1);
    expect(handleTitleClick.mock.calls[0][0]).toEqual(offer);
  });
});
