import React from 'react';
import renderer from 'react-test-renderer';

import ReviewsList from './reviews-list';

const reviews = [
  {
    id: 1,
    text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
    perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
    a great value and location.`,
    rating: 5,
    date: new Date(`2020-03-15`),
    user: {
      name: `Steven`,
      picture: `https://api.adorable.io/avatars/128/1`,
    }
  },
  {
    id: 2,
    text: `Apartment was very pretty and quaint! Location was excellent , very close to the main 
    sights in Porto. Abott greeted us and was very helpful, gave us some great tips.`,
    rating: 4,
    date: new Date(`2020-03-15`),
    user: {
      name: `Monica`,
      picture: `https://api.adorable.io/avatars/128/2`,
    }
  },
];

it(`Компонент «ReviewsList» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <ReviewsList reviews={reviews}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
