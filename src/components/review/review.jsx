import React from 'react';
import PropTypes from 'prop-types';

import {RATING_MAX, DateFormat} from '../../constants';
import {getRatingInPercent, formatDateToString} from '../../utils.js';

const Review = (props) => {
  const {
    review: {
      text,
      rating,
      date,
      user: {
        name,
        picture,
      }
    }
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={picture}
            width="54"
            height="54"
            alt="Reviewer's avatar"
          />
        </div>

        <span className="reviews__user-name">{name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating, RATING_MAX)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">{text}</p>

        <time
          className="reviews__time"
          dateTime={formatDateToString(date, DateFormat.WITH_DASHES)}
        >
          {formatDateToString(date, DateFormat.FULL)}
        </time>
      </div>
    </li>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    user: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
  }).isRequired,
};

export default Review;