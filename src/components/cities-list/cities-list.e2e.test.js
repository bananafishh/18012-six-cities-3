import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CitiesList from './cities-list';

configure({adapter: new Adapter()});

const cities = [`Amsterdam`, `Paris`, `Brussels`];

describe(`Компонент «CitiesList» работает корректно`, () => {
  it(`При клике по городу вызывается коллбэк, в который передаётся выбранный город`, () => {
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
