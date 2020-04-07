import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Offer} from '../../constants';

const ReviewForm = (props) => {
  const {
    offerId,
    review,
    rating,
    isReviewPosting,
    isReviewPostingError,
    onChange,
    onReviewSend,
    onReset,
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    onReviewSend(offerId, {review, rating}).then(onReset);
  };

  const isButtonDisabled = !rating
    || review.length < Offer.REVIEW_LENGTH_MIN
    || review.length > Offer.REVIEW_LENGTH_MAX;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {Array(Offer.RATING_MAX)
          .fill(``)
          .map((_, index) => ++index)
          .reverse()
          .map((value) => (
            <Fragment key={`${value}-star`}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${value}-stars`}
                type="radio"
                value={value}
                checked={value === rating}
                disabled={isReviewPosting}
                onChange={onChange}
              />

              <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))
        }
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isReviewPosting}
        onChange={onChange}
      />

      {isReviewPostingError && (
        <b className="reviews__label form__label" style={{color: `red`}}>
          Something went wrong. Please try again later.
        </b>
      )}

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  offerId: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  isReviewPosting: PropTypes.bool.isRequired,
  isReviewPostingError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onReviewSend: PropTypes.func.isRequired,
};

export default ReviewForm;
