import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ReviewForm from './review-form';

configure({adapter: new Adapter()});

const reviewData = {
  review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4,
};

describe(`Компонент «ReviewForm» работает корректно`, () => {
  it(`При отправке отзыва вызывается коллбэк, в который передаются введённые данные`, () => {
    const handleSubmit = jest.fn().mockResolvedValue(Promise.resolve);
    const event = {preventDefault: () => {}};

    const reviewForm = shallow(
        <ReviewForm
          offerId={1}
          review={reviewData.review}
          rating={reviewData.rating}
          isReviewPosting={false}
          isReviewPostingError={false}
          onChange={() => {}}
          onReviewSend={handleSubmit}
          onReset={() => {}}
        />
    );

    reviewForm.simulate(`submit`, event);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit.mock.calls[0][0]).toEqual(1);
    expect(handleSubmit.mock.calls[0][1]).toEqual(reviewData);
  });
});
