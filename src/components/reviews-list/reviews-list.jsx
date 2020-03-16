import React from 'react';
import PropTypes from 'prop-types';

import Review from '../review/review.jsx';

const ReviewsList = (props) => {
  const {reviews} = props;

  if (!reviews.length) {
    return null;
  }

  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review}/>
      ))}
    </ul>
  );
};

ReviewsList.defaultProps = {
  reviews: [],
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    user: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
  })).isRequired,
};

export default ReviewsList;
