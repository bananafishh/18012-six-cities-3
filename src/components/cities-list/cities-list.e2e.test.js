import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CitiesList from './cities-list';

configure({adapter: new Adapter()});

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

describe(`Компонент «CitiesList» работает корректно`, () => {
  it(`При клике по городу вызывается коллбэк`, () => {
    const handleCityClick = jest.fn();

    const citiesList = shallow(
        <CitiesList
          cities={cities}
          currentCity={cities[0]}
          onCityChange={handleCityClick}
        />
    );

    const cityLinks = citiesList.find(`.locations__item-link`);

    cityLinks.forEach((link) => link.simulate(`click`));
    expect(handleCityClick).toHaveBeenCalledTimes(cities.length);
  });

  it(`При клике по городу в вызванный коллбэк передаётся выбранный город`, () => {
    const handleCityClick = jest.fn();

    const citiesList = shallow(
        <CitiesList
          cities={cities}
          currentCity={cities[0]}
          onCityChange={handleCityClick}
        />
    );

    const cityLinks = citiesList.find(`.locations__item-link`);

    cityLinks.at(1).simulate(`click`);
    expect(handleCityClick).toHaveBeenCalledTimes(1);
    expect(handleCityClick.mock.calls[0][0]).toEqual(cities[1]);
  });
});
