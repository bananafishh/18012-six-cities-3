import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SortingOptions from './sorting-options';

configure({adapter: new Adapter()});

const sortingOptions = [
  {
    label: `Popular`,
    value: `popular`,
  },
  {
    label: `Price: low to high`,
    value: `priceLowToHigh`,
  },
];

describe(`Компонент «SortingOptions» работает корректно`, () => {
  it(`При клике по варианту сортировки вызывается коллбэк, в который передаётся выбранный вариант`, () => {
    const handleOptionClick = jest.fn();

    const sortingOptionsElement = shallow(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={handleOptionClick}
          isOpen={true}
          onToggleButtonClick={() => {}}
        />
    );

    const sortingOptionsItems = sortingOptionsElement.find(`.places__option`);

    sortingOptionsItems.at(1).simulate(`click`);
    expect(handleOptionClick).toHaveBeenCalledTimes(1);
    expect(handleOptionClick.mock.calls[0][0]).toEqual(sortingOptions[1]);
  });
});
