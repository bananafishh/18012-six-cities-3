import React from 'react';
import renderer from 'react-test-renderer';

import SortingOptions from './sorting-options';

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

it(`Компонент «SortingOptions» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <SortingOptions
          options={sortingOptions}
          currentOption={sortingOptions[1]}
          onOptionChange={() => {}}
          isOpen={false}
          onToggleButtonClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
