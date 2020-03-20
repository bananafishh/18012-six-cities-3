import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {CitiesList} from './cities-list';

configure({adapter: new Adapter()});

const offers = {
  Amsterdam: {
    city: {
      name: `Amsterdam`,
      coords: [52.37403, 4.88969],
    },
    offers: [
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
    ],
  },
  Paris: {
    city: {
      name: `Paris`,
      coords: [48.85341, 2.3488],
    },
    offers: [
      {
        id: 3,
        title: `Cozy Parkside Studio in the ❤ of the East Village`,
        type: `hotel`,
        price: 500,
        pictures: [`https://placeimg.com/260/200/arch/1`],
        rating: 5,
        isPremium: true,
        isBookmarked: true,
      },
    ],
  },
  Brussels: {
    city: {
      name: `Brussels`,
      coords: [50.85045, 4.34878],
    },
    offers: [
      {
        id: 4,
        title: `Sunny, Modern room in East Village!`,
        type: `room`,
        price: 80,
        pictures: [`https://placeimg.com/260/200/arch/1`],
        rating: 2.5,
        isPremium: false,
        isBookmarked: false,
      },
    ],
  },
};

const currentCity = {
  name: `Amsterdam`,
  coords: [52.37403, 4.88969],
};

const cities = [
  {
    name: `Amsterdam`,
    coords: [52.37403, 4.88969],
  },
  {
    name: `Paris`,
    coords: [48.85341, 2.3488],
  },
  {
    name: `Brussels`,
    coords: [50.85045, 4.34878],
  },
];

it(`При переключении города вызывается коллбэк, в который передаются новый город и его предложения об аренде`, () => {
  const handleCityClick = jest.fn();

  const citiesList = shallow(
      <CitiesList
        offers={offers}
        currentCity={currentCity}
        onCityChange={handleCityClick}
      />
  );

  const cityLinks = citiesList.find(`.locations__item-link`);

  cityLinks.forEach((link) => link.simulate(`click`));
  expect(handleCityClick).toHaveBeenCalledTimes(cities.length);

  cityLinks.at(0).simulate(`click`);
  expect(handleCityClick.mock.calls[0][0]).toMatchObject(offers);
  expect(handleCityClick.mock.calls[0][1]).toMatchObject(cities[0]);
});
