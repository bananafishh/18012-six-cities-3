import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withReviewFieldsChange from './with-review-fields-change';

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {
    review,
    rating,
    onChange,
    onReset,
  } = props;

  return (
    <form onSubmit={onReset}>
      <input type="radio" name="rating" className="rating-input" value={rating} onChange={onChange}/>
      <textarea name="review" className="review-input" value={review} onChange={onChange}/>

      <button type="submit">Submit</button>
    </form>
  );
};

MockComponent.propTypes = {
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

const MockComponentWrapped = withReviewFieldsChange(MockComponent);

const initialReviewData = {
  review: ``,
  rating: 0,
};

const reviewData = {
  review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 5,
};

describe(`HOC «withReviewFieldsChange» работает корректно`, () => {
  it(`При выборе оценки вызывается коллбэк, в который передаётся выбранный рейтинг`, () => {
    const mockComponent = mount(<MockComponentWrapped/>);

    const event = {
      target: {
        value: reviewData.rating,
        name: `rating`,
      }
    };

    const ratingInput = mockComponent.find(`.rating-input`);

    ratingInput.simulate(`change`, event);
    expect(Number(ratingInput.instance().value)).toBe(reviewData.rating);
  });

  it(`При вводе/изменении значения в текстовой области вызывается коллбэк, в который передаётся введённое значение`, () => {
    const mockComponent = mount(<MockComponentWrapped/>);

    const event = {
      target: {
        value: reviewData.review,
        name: `review`,
      }
    };

    const reviewInput = mockComponent.find(`.review-input`);

    reviewInput.simulate(`change`, event);
    expect(reviewInput.instance().value).toBe(reviewData.review);
  });

  it(`После успешной отправки отзыва форма очищается`, () => {
    const mockComponent = mount(<MockComponentWrapped/>);
    const event = {preventDefault: () => {}};

    const reviewForm = mockComponent.find(`form`);
    const reviewInput = mockComponent.find(`.review-input`);
    const ratingInput = mockComponent.find(`.rating-input`);

    reviewForm.simulate(`submit`, event);
    expect(Number(ratingInput.instance().value)).toBe(initialReviewData.rating);
    expect(reviewInput.instance().value).toBe(initialReviewData.review);
  });
});
