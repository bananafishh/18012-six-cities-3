import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

import {AuthStatus} from '../../constants';

import OfferCard from './offer-card';

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

it(`Компонент «OfferCard» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OfferCard
            offer={offer}
            authStatus={AuthStatus.AUTH}
            history={history}
            onTitleClick={() => {}}
            onHover={() => {}}
            onBookmarkClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
