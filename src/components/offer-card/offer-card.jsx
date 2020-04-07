import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {AppRoute, AuthStatus, PlaceType} from '../../constants';
import {getRatingInPercent} from '../../utils';

const OfferCard = (props) => {
  const {
    offer,
    mix,
    authStatus,
    history,
    onHover,
    onBookmarkClick,
  } = props;

  const {
    id,
    title,
    type,
    price,
    previewImage,
    rating,
    isPremium,
    isFavorite,
  } = offer;

  const handleHover = (offerId) => onHover && onHover(offerId);

  const handleBookmarkClick = (offerId, isOfferFavorite) => (
    authStatus === AuthStatus.AUTH
      ? onBookmarkClick(offerId, isOfferFavorite)
      : history.push(AppRoute.SIGN_IN)
  );

  return (
    <article
      className={`place-card${mix ? ` ${mix}` : ``}`}
      onMouseEnter={() => handleHover(id)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            {` `}
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={`place-card__bookmark-button${isFavorite ? ` place-card__bookmark-button--active` : ``} button`}
            type="button"
            onClick={() => handleBookmarkClick(id, isFavorite)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>

            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={{pathname: `${AppRoute.OFFER}/${id}`}}>{title}</Link>
        </h2>

        <p className="place-card__type">{PlaceType[type.toUpperCase()]}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  }).isRequired,
  mix: PropTypes.string,
  authStatus: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onHover: PropTypes.func,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default OfferCard;
