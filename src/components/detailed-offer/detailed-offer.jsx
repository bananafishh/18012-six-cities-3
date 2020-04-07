import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  getReviews,
  getNearbyOffers,
  getReviewPostingStatus,
  getReviewPostingError
} from '../../reducer/data/selector';

import {Operation} from '../../reducer/data/data';
import withReviewFieldsChange from '../../hoc/with-review-fields-change/with-review-fields-change';

import {
  Offer,
  PlaceType,
  AuthStatus,
} from '../../constants';

import {getRatingInPercent, pluralizeWord} from '../../utils';

import ReviewsList from '../reviews-list/reviews-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import ReviewForm from '../review-form/review-form.jsx';

const ReviewFormWrapped = withReviewFieldsChange(ReviewForm);

class DetailedOffer extends PureComponent {
  componentDidMount() {
    const {
      offer: {id},
      onOfferDataLoad,
    } = this.props;

    onOfferDataLoad(id);
  }

  componentDidUpdate(prevProps) {
    const {
      offer: {id},
      onOfferDataLoad,
    } = this.props;

    if (id !== prevProps.offer.id) {
      onOfferDataLoad(id);
    }
  }

  render() {
    const {
      offer,
      reviews,
      nearbyOffers,
      authStatus,
      isReviewPosting,
      isReviewPostingError,
      onNearbyOfferTitleClick,
      onReviewSend,
    } = this.props;

    const {
      id,
      title,
      type,
      price,
      images,
      rating,
      isPremium,
      isFavorite,
      description,
      bedrooms,
      maxAdults,
      goods,
      host: {
        name,
        avatarUrl,
        isPro,
      },
    } = offer;

    const sortedReviews = reviews.length
      ? reviews
        .slice(0, Offer.REVIEWS_MAX)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      : [];

    const nearbyOffersForRender = nearbyOffers.slice(0, Offer.NEARBY_OFFERS_MAX);
    const offers = [offer, ...nearbyOffersForRender];

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {!!images.length && images
                .slice(0, Offer.IMAGES_MAX)
                .map((picture) => (
                  <div key={picture} className="property__image-wrapper">
                    <img className="property__image" src={picture} alt="Photo studio"/>
                  </div>
                ))}
            </div>
          </div>

          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>

                <button
                  className={`property__bookmark-button${isFavorite ? ` property__bookmark-button--active` : ``} button`}
                  type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>

                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>

                <span className="property__rating-value rating__value">{rating}</span>
              </div>

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {PlaceType[type.toUpperCase()]}
                </li>

                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {pluralizeWord(`Bedroom`, bedrooms)}
                </li>

                <li className="property__feature property__feature--adults">
                  Max {maxAdults} {pluralizeWord(`adult`, maxAdults)}
                </li>
              </ul>

              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                {` `}
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>

                <ul className="property__inside-list">
                  {!!goods.length && goods.map((householdItem) => (
                    <li key={householdItem} className="property__inside-item">{householdItem}</li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>

                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper${isPro ? ` property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>

                  <span className="property__user-name">{name}</span>
                </div>

                <div className="property__description">
                  {description
                    .split(`\n`)
                    .map((descriptionItem, index) => (
                      <p key={index} className="property__text">{descriptionItem}</p>
                    ))
                  }
                </div>
              </div>

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span
                  className="reviews__amount">{sortedReviews.length}</span></h2>

                <ReviewsList reviews={sortedReviews}/>

                {authStatus === AuthStatus.AUTH && (
                  <ReviewFormWrapped
                    offerId={id}
                    isReviewPosting={isReviewPosting}
                    isReviewPostingError={isReviewPostingError}
                    onReviewSend={onReviewSend}
                  />
                )}
              </section>
            </div>
          </div>

          <section className="property__map map">
            <Map
              offers={offers}
              activeOfferId={id}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <OffersList
              mix="near-places__list places__list"
              offerMix="near-places__card"
              offers={nearbyOffersForRender}
              onOfferTitleClick={onNearbyOfferTitleClick}
            />
          </section>
        </div>
      </main>
    );
  }
}

DetailedOffer.defaultProps = {
  offer: {},
  images: [],
  goods: [],
  reviews: [],
};

DetailedOffer.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string),
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    description: PropTypes.string,
    bedrooms: PropTypes.number,
    maxAdults: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    host: PropTypes.shape({
      name: PropTypes.string,
      isPro: PropTypes.bool,
      avatarUrl: PropTypes.string,
    }),
  }).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    })
  })).isRequired,
  nearbyOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  })).isRequired,
  authStatus: PropTypes.string.isRequired,
  isReviewPosting: PropTypes.bool.isRequired,
  isReviewPostingError: PropTypes.bool.isRequired,
  onNearbyOfferTitleClick: PropTypes.func.isRequired,
  onOfferDataLoad: PropTypes.func.isRequired,
  onReviewSend: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  isReviewPosting: getReviewPostingStatus(state),
  isReviewPostingError: getReviewPostingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onOfferDataLoad(offerId) {
    dispatch(Operation.loadReviews(offerId));
    dispatch(Operation.loadNearbyOffers(offerId));
  },
  onReviewSend(offerId, review) {
    const postReviewPromise = dispatch(Operation.postReview(offerId, review));

    return postReviewPromise;
  },
});

export {DetailedOffer};
export default connect(mapStateToProps, mapDispatchToProps)(DetailedOffer);
