import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import {ActionCreator} from '../../reducer/app/app';
import {Operation as UserOperation} from '../../reducer/user/user';
import {getSortedOffers, getCities, getFavoriteOffers} from '../../reducer/data/selector';
import {getCurrentCity, getCurrentSortingOption, getActiveOfferId} from '../../reducer/app/selector';
import {getAuthStatus, getUserData} from '../../reducer/user/selector';

import {AppRoute} from '../../constants';
import withAuthFieldsChange from '../../hocs/with-auth-fields-change/with-auth-fields-change';

import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import DetailedOffer from '../detailed-offer/detailed-offer.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {Operation} from "../../reducer/data/data";
import PrivateRoute from '../private-route/private-route.jsx';
import FavoriteOffers from '../favorite-offers/favorite-offers.jsx';

const SignInWrapped = withAuthFieldsChange(SignIn);

const App = (props) => {
  const {
    offers,
    favoriteOffers,
    authStatus,
    user,
    cities,
    currentCity,
    currentSortingOption,
    activeOfferId,
    onSortingOptionChange,
    onOfferHover,
    onBookmarkClick,
    onCityChange,
    onSignIn,
  } = props;

  return (
    <Router>
      <Page
        authStatus={authStatus}
        user={user}
        favoriteOffers={favoriteOffers.length}
      >
        <Switch>
          <Route
            exact
            path={AppRoute.ROOT}
            render={(routeProps) => (
              <Main
                offers={offers}
                cities={cities}
                currentCity={currentCity}
                currentSortingOption={currentSortingOption}
                activeOfferId={activeOfferId}
                authStatus={authStatus}
                onSortingOptionChange={onSortingOptionChange}
                onOfferHover={onOfferHover}
                onBookmarkClick={onBookmarkClick}
                onCityChange={onCityChange}
                {...routeProps}
              />
            )}
          />

          <Route exact path={AppRoute.SIGN_IN}>
            <SignInWrapped
              authStatus={authStatus}
              currentCity={currentCity}
              onSignIn={onSignIn}
            />
          </Route>

          <Route
            exact
            path={`${AppRoute.OFFER}/:id`}
            render={(routeProps) => (
              <DetailedOffer
                id={Number(routeProps.match.params.id)}
                authStatus={authStatus}
                {...routeProps}
              />
            )}
          />

          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            authStatus={authStatus}
            render={(routeProps) => (
              <FavoriteOffers {...routeProps}/>
            )}
          />

          <Redirect to={AppRoute.ROOT}/>
        </Switch>
      </Page>
    </Router>
  );
};
App.defaultProps = {
  favoriteOffers: [],
};

App.propTypes = {
  authStatus: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  })).isRequired,
  favoriteOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  })).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentSortingOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  activeOfferId: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool,
  }).isRequired,
  onSortingOptionChange: PropTypes.func.isRequired,
  onOfferHover: PropTypes.func,
  onBookmarkClick: PropTypes.func.isRequired,
  onCityChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
  offers: getSortedOffers(state),
  favoriteOffers: getFavoriteOffers(state),
  cities: getCities(state),
  currentCity: getCurrentCity(state),
  currentSortingOption: getCurrentSortingOption(state),
  activeOfferId: getActiveOfferId(state),
  user: getUserData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCurrentCity(city));
  },
  onSortingOptionChange(option) {
    dispatch(ActionCreator.changeSortingOption(option));
  },
  onOfferHover(offerId) {
    dispatch(ActionCreator.changeActiveOffer(offerId));
  },
  onBookmarkClick(offerId, isFavorite) {
    dispatch(Operation.toggleFavorite(offerId, isFavorite));
  },
  onSignIn(userData) {
    dispatch(UserOperation.signIn(userData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
