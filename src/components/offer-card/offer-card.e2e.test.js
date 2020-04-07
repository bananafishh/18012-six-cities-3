import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthStatus} from '../../constants';

import OfferCard from './offer-card';

configure({adapter: new Adapter()});

const offer = {
  id: 1,
  title: `Luxe 1-Bedroom Flat Near Manhattan`,
  type: `apartment`,
  price: 120,
  previewImage: `https://placeimg.com/260/200/arch/1`,
  rating: 4.5,
  isPremium: true,
  isFavorite: false,
};

const history = {
  push: () => {},
};

describe(`Компонент «OfferCard» работает корректно`, () => {
  it(`При наведении на карточку предложения об аренде вызывается коллбэк, в который передаётся id предложения`, () => {
    const handleHover = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          authStatus={AuthStatus.AUTH}
          history={history}
          onTitleClick={() => {}}
          onHover={handleHover}
          onBookmarkClick={() => {}}
        />
    );

    offerCard.simulate(`mouseenter`);
    expect(handleHover).toHaveBeenCalledTimes(1);
    expect(handleHover.mock.calls[0][0]).toBe(offer.id);
  });

  it(`При клике по иконке закладки вызывается коллбэк, в который передаются id и статус «избранности» предложения об аренде`, () => {
    const handleBookmarkClick = jest.fn();

    const offerCard = shallow(
        <OfferCard
          offer={offer}
          authStatus={AuthStatus.AUTH}
          history={history}
          onTitleClick={() => {}}
          onHover={() => {}}
          onBookmarkClick={handleBookmarkClick}
        />
    );

    const bookmarkButton = offerCard.find(`.place-card__bookmark-button`);

    bookmarkButton.simulate(`click`);
    expect(handleBookmarkClick).toHaveBeenCalledTimes(1);
    expect(handleBookmarkClick.mock.calls[0][0]).toBe(offer.id);
    expect(handleBookmarkClick.mock.calls[0][1]).toBe(offer.isFavorite);
  });
});
