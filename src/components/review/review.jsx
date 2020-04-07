import React from 'react';
import PropTypes from 'prop-types';

import {DateFormat} from '../../constants';
import {getRatingInPercent, formatDate} from '../../utils';

const Review = (props) => {
  const {
    review: {
      text,
      rating,
      date,
      user: {
        name,
        avatarUrl,
      }
    }
  } = props;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
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
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">{text}</p>

        <time
          className="reviews__time"
          dateTime={formatDate(date, DateFormat.WITH_DASHES)}
        >
          {formatDate(date, DateFormat.FULL)}
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
    date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }).isRequired,
};

export default Review;
