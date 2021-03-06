import {extend} from '../../utils';
import {ActionCreator as AppActionCreator} from '../app/app';
import OffersDataAdapter from '../../adapters/offers-data-adapter';
import ReviewsDataAdapter from '../../adapters/reviews-data-adapter';

const initialState = {
  offers: [],
  reviews: [],
  nearbyOffers: [],
  isReviewPosting: false,
  isReviewPostingError: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  SET_REVIEW_POSTING_STATUS: `SET_REVIEW_POSTING_STATUS`,
  SET_REVIEW_POSTING_ERROR: `SET_REVIEW_POSTING_ERROR`,
  TOGGLE_FAVORITE: `TOGGLE_FAVORITE`,
};

const updateOffers = (offers, offerId, payload) => (
  offers.map((offer) => offer.id === offerId ? payload : offer)
);

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
  loadNearbyOffers: (nearbyOffers) => ({
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: nearbyOffers,
  }),
  setReviewPostingStatus: (isReviewPosting) => ({
    type: ActionType.SET_REVIEW_POSTING_STATUS,
    payload: isReviewPosting,
  }),
  setReviewPostingError: (isError) => ({
    type: ActionType.SET_REVIEW_POSTING_ERROR,
    payload: isError,
  }),
  toggleFavorite: (offer) => ({
    type: ActionType.TOGGLE_FAVORITE,
    payload: offer,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const offers = OffersDataAdapter.parseOffers(response.data);

        dispatch(ActionCreator.loadOffers(offers));
        dispatch(AppActionCreator.setCurrentCity(offers));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadReviews: (offerId) => (dispatch, getState, api) => {
    return api.get(`/comments/${offerId}`)
      .then((response) => {
        const reviews = ReviewsDataAdapter.parseReviews(response.data);

        dispatch(ActionCreator.loadReviews(reviews));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadNearbyOffers: (offerId) => (dispatch, getState, api) => {
    return api.get(`/hotels/${offerId}/nearby`)
      .then((response) => {
        const nearbyOffers = OffersDataAdapter.parseOffers(response.data);

        dispatch(ActionCreator.loadNearbyOffers(nearbyOffers));
      })
      .catch((err) => {
        throw err;
      });
  },
  postReview: (offerId, reviewData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setReviewPostingStatus(true));

    return api.post(`/comments/${offerId}`, {
      rating: reviewData.rating,
      comment: reviewData.review,
    })
      .then((response) => {
        const reviews = ReviewsDataAdapter.parseReviews(response.data);

        dispatch(ActionCreator.loadReviews(reviews));
      })
      .catch(() => {
        dispatch(ActionCreator.setReviewPostingError(true));
      })
      .finally(() => {
        dispatch(ActionCreator.setReviewPostingStatus(false));
      });
  },
  toggleFavorite: (offerId, isFavorite) => (dispatch, getState, api) => {
    return api.post(`/favorite/${offerId}/${isFavorite ? 0 : 1}`)
      .then((response) => {
        const offer = OffersDataAdapter.parseOffer(response.data);

        dispatch(ActionCreator.toggleFavorite(offer));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {offers: action.payload});

    case ActionType.LOAD_REVIEWS:
      return extend(state, {reviews: action.payload});

    case ActionType.LOAD_NEARBY_OFFERS:
      return extend(state, {nearbyOffers: action.payload});

    case ActionType.SET_REVIEW_POSTING_STATUS:
      return extend(state, {isReviewPosting: action.payload});

    case ActionType.SET_REVIEW_POSTING_ERROR:
      return extend(state, {isReviewPostingError: action.payload});

    case ActionType.TOGGLE_FAVORITE:
      const offerId = action.payload.id;

      const offers = updateOffers(state.offers, offerId, action.payload);
      const nearbyOffers = updateOffers(state.nearbyOffers, offerId, action.payload);

      return extend(state, {offers, nearbyOffers});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, Operation, reducer};
