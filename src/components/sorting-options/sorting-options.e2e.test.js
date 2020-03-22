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
  it(`При клике по варианту сортировки вызывается коллбэк`, () => {
    const handleOptionClick = jest.fn();

    const sortingOptionsElement = shallow(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={handleOptionClick}
        />
    );

    const sortingOptionsItems = sortingOptionsElement.find(`.places__option`);

    sortingOptionsItems.forEach((sortingOptionsItem) => sortingOptionsItem.simulate(`click`));
    expect(handleOptionClick).toHaveBeenCalledTimes(sortingOptions.length);
  });

  it(`При клике по варианту сортировки в вызванный коллбэк передаётся выбранный вариант`, () => {
    const handleOptionClick = jest.fn();

    const sortingOptionsElement = shallow(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={handleOptionClick}
        />
    );

    const sortingOptionsItems = sortingOptionsElement.find(`.places__option`);

    sortingOptionsItems.at(1).simulate(`click`);
    expect(handleOptionClick).toHaveBeenCalledTimes(1);
    expect(handleOptionClick.mock.calls[0][0]).toEqual(sortingOptions[1]);
  });

  it(`При клике по строке с выбранным вариантом сортировки происходит показ/скрытие меню сортировки`, () => {
    const sortingOptionsElement = shallow(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={() => {}}
        />
    );

    const sortingOptionsTitle = sortingOptionsElement.find(`.places__sorting-type`);

    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(0);

    sortingOptionsTitle.simulate(`click`);
    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(1);

    sortingOptionsTitle.simulate(`click`);
    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(0);
  });

  it(`При клике по варианту сортировки происходит скрытие меню сортировки`, () => {
    const sortingOptionsElement = shallow(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={() => {}}
        />
    );

    const sortingOptionsTitle = sortingOptionsElement.find(`.places__sorting-type`);
    const sortingOptionsItems = sortingOptionsElement.find(`.places__option`);

    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(0);

    sortingOptionsTitle.simulate(`click`);
    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(1);

    sortingOptionsItems.at(1).simulate(`click`);
    expect(sortingOptionsElement.find(`.places__options--opened`).length).toBe(0);
  });
});
