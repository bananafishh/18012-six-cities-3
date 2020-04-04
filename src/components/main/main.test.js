import React from 'react';
import renderer from 'react-test-renderer';

import Main from './main';

const city = {
  name: `Dusseldorf`,
  location: {
    latitude: 51.225402,
    longitude: 6.776314,
    zoom: 13,
  },
};

const offers = [
  {
    id: 1,
    city,
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
    city,
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    previewImage: `https://placeimg.com/260/200/arch/2`,
    rating: 3.9,
    isPremium: false,
    isFavorite: true,
  },
  {
    id: 3,
    city,
    title: `Cozy Parkside Studio in the ❤ of the East Village`,
    type: `hotel`,
    price: 500,
    previewImage: `https://placeimg.com/260/200/arch/3`,
    rating: 5,
    isPremium: true,
    isFavorite: true,
  },
  {
    id: 4,
    city,
    title: `Sunny, Modern room in East Village!`,
    type: `room`,
    price: 80,
    previewImage: `https://placeimg.com/260/200/arch/4`,
    rating: 2.5,
    isPremium: false,
    isFavorite: false,
  },
];

const cities = [`Amsterdam`, `Paris`, `Brussels`];

const currentSortingOption = {
  label: `Price: low to high`,
  value: `priceLowToHigh`,
};

const activeOfferId = 1;

it(`Компонент «Main» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Main
          offers={offers}
          cities={cities}
          currentCity={cities[0]}
          activeOfferId={activeOfferId}
          currentSortingOption={currentSortingOption}
          onCityChange={() => {}}
          onOfferHover={() => {}}
          onOfferTitleClick={() => {}}
          onSortingOptionChange={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
