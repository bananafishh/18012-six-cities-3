import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review';

const review = {
  id: 1,
  text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
  perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
  a great value and location.`,
  rating: 5,
  date: new Date(`2020-03-15`),
  user: {
    name: `Steven`,
    picture: `https://api.adorable.io/avatars/128/1`,
  },
};

it(`Компонент «Review» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <Review review={review}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
