import MockAdapter from "axios-mock-adapter";

import {createApi} from '../../api';
import {reducer, ActionType, Operation, ActionCreator} from './data';
import {ActionType as AppActionType} from '../app/app';
import OffersDataAdapter from '../../adapters/offers-data-adapter';
import ReviewsDataAdapter from '../../adapters/reviews-data-adapter';

const api = createApi(() => {});

const apiOffers = [
  {
    'bedrooms': 3,
    'city': {
      'location': {
        'latitude': 52.370216,
        'longitude': 4.895168,
        'zoom': 10,
      },
      'name': `Amsterdam`,
    },
    'description': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'goods': [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
    'host': {
      'avatar_url': `img/1.png`,
      'id': 3,
      'is_pro': true,
      'name': `Angelina`,
    },
    'id': 1,
    'images': [`img/1.png`, `img/2.png`],
    'is_favorite': false,
    'is_premium': false,
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8,
    },
    'max_adults': 4,
    'preview_image': `img/1.png`,
    'price': 120,
    'rating': 4.8,
    'title': `Beautiful & luxurious studio at great location`,
    'type': `apartment`,
  },
];

const offers = [
  {
    id: 1,
    city: {
      name: `Paris`,
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    title: `Luxe 1-Bedroom Flat Near Manhattan`,
    type: `apartment`,
    price: 120,
    previewImage: `https://placeimg.com/260/200/arch/1`,
    rating: 4.5,
    isPremium: true,
    isFavorite: false,
  },
  {
    id: 2,
    city: {
      name: `Cologne`,
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    },
    title: `Bright & Airy in Highland Park`,
    type: `house`,
    price: 200,
    previewImage: `https://placeimg.com/260/200/arch/2`,
    rating: 3.9,
    isPremium: false,
    isFavorite: true,
  },
];

const apiReviews = [
  {
    'comment': `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
    'date': `2019-05-08T14:13:56.569Z`,
    'id': 1,
    'rating': 4,
    'user': {
      'avatar_url': `img/1.png`,
      'id': 4,
      'is_pro': false,
      'name': `Max`,
    },
  },
];

const reviews = [
  {
    id: 1,
    text: `Excellent location in a charming building. It’s about the size of a typical hotel room and 
    perhaps a little smaller than Airbnb places tend to be overall. Would recommend though as it’s 
    a great value and location.`,
    rating: 5,
    date: `2019-05-03T14:13:56.569Z`,
    user: {
      name: `Steven`,
      picture: `https://api.adorable.io/avatars/128/1`,
    }
  },
  {
    id: 2,
    text: `Apartment was very pretty and quaint! Location was excellent , very close to the main 
    sights in Porto. Abott greeted us and was very helpful, gave us some great tips.`,
    rating: 4,
    date: `2019-05-08T14:13:56.569Z`,
    user: {
      name: `Monica`,
      picture: `https://api.adorable.io/avatars/128/2`,
    }
  },
];

const reviewData = {
  review: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  rating: 4,
};

describe(`Редьюсер «data» работает корректно`, () => {
  it(`Возвращает начальный стейт, если вызван без параметров`, () => {
    expect(reducer(void 0, {})).toEqual({
      offers: [],
      reviews: [],
      nearbyOffers: [],
      isReviewPosting: false,
      isReviewPostingError: false,
    });
  });

  it(`Изменяет список предложений об аренде на переданное значение`, () => {
    expect(reducer({
      offers: [],
    }, {
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    })).toEqual({
      offers,
    });
  });

  it(`Изменяет список предложений об аренде неподалёку на переданное значение`, () => {
    expect(reducer({
      nearbyOffers: [],
    }, {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers,
    })).toEqual({
      nearbyOffers: offers,
    });
  });

  it(`Изменяет список отзывов на переданное значение`, () => {
    expect(reducer({
      reviews: [],
    }, {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    })).toEqual({
      reviews,
    });
  });

  it(`Устанавливает статус отправки отзыва`, () => {
    expect(reducer({
      isReviewPosting: false,
    }, {
      type: ActionType.SET_REVIEW_POSTING_STATUS,
      payload: true,
    })).toEqual({
      isReviewPosting: true,
    });
  });

  it(`Устанавливает статус ошибки отправки отзыва`, () => {
    expect(reducer({
      isReviewPostingError: false,
    }, {
      type: ActionType.SET_REVIEW_POSTING_ERROR,
      payload: true,
    })).toEqual({
      isReviewPostingError: true,
    });
  });
});

describe(`Загрузка данных с сервера происходит корректно`, () => {
  it(`Происходит корректный GET запрос к API по адресу /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadOffers();
    const adaptedOffers = OffersDataAdapter.parseOffers(apiOffers);

    apiMock
      .onGet(`/hotels`)
      .reply(200, apiOffers);

    return loadOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: adaptedOffers,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.SET_CURRENT_CITY,
          payload: adaptedOffers[0].city.name,
        });
      });
  });

  it(`Происходит корректный GET запрос к API по адресу /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadReviews = Operation.loadReviews(1);
    const adaptedReviews = ReviewsDataAdapter.parseReviews(apiReviews);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, apiReviews);

    return loadReviews(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_REVIEWS,
          payload: adaptedReviews,
        });
      });
  });

  it(`Происходит корректный GET запрос к API по адресу /hotels/:hotel_id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadNearbyOffers(1);
    const adaptedOffers = OffersDataAdapter.parseOffers(apiOffers);

    apiMock
      .onGet(`/hotels/1/nearby`)
      .reply(200, apiOffers);

    return loadOffers(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_NEARBY_OFFERS,
          payload: adaptedOffers,
        });
      });
  });

  it(`Происходит корректный POST запрос к API по адресу /comments/:hotel_id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const postReview = Operation.postReview(offers[0].id, reviewData);
    const adaptedReviews = ReviewsDataAdapter.parseReviews(apiReviews);

    apiMock
      .onPost(`/comments/1`)
      .reply(200, apiReviews);

    return postReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEW_POSTING_STATUS,
          payload: true,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_REVIEWS,
          payload: adaptedReviews,
        });

        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.SET_REVIEW_POSTING_STATUS,
          payload: false,
        });
      });
  });
});

describe(`Action creator работает корректно`, () => {
  it(`Action creator для загрузки списка предложений об аренде возвращает правильный action`, () => {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator для загрузки списка предложений об аренде неподалёку возвращает правильный action`, () => {
    expect(ActionCreator.loadNearbyOffers(offers)).toEqual({
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers,
    });
  });

  it(`Action creator для загрузки списка отзывов возвращает правильный action`, () => {
    expect(ActionCreator.loadReviews(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    });
  });

  it(`Action creator для установки статуса отправки отзыва возвращает правильный action`, () => {
    expect(ActionCreator.setReviewPostingStatus(true)).toEqual({
      type: ActionType.SET_REVIEW_POSTING_STATUS,
      payload: true,
    });
  });

  it(`Action creator для установки статуса ошибки отправки отзыва возвращает правильный action`, () => {
    expect(ActionCreator.setReviewPostingError(true)).toEqual({
      type: ActionType.SET_REVIEW_POSTING_ERROR,
      payload: true,
    });
  });
});
