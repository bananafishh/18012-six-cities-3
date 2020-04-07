import React from 'react';
import renderer from 'react-test-renderer';

import ReviewForm from './review-form';

const reviewData = {
  review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4,
};

it(`Компонент «ReviewForm» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          offerId={1}
          review={reviewData.review}
          rating={reviewData.rating}
          isReviewPosting={false}
          isReviewPostingError={false}
          onChange={() => {}}
          onReviewSend={() => {}}
          onReset={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
