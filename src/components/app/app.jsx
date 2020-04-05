import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/app/app';
import {Operation as UserOperation} from '../../reducer/user/user';
import {getSortedOffers, getCities} from '../../reducer/data/selector';
import {getCurrentCity, getCurrentSortingOption, getActiveOfferId} from '../../reducer/app/selector';
import {getAuthStatus, getUserData} from '../../reducer/user/selector';

import {AuthStatus} from '../../constants';
import withAuthFieldsChange from '../../hoc/with-auth-fields-change/with-auth-fields-change';

import Page from '../page/page.jsx';
import Main from '../main/main.jsx';
import DetailedOfferInfo from '../detailed-offer-info/detailed-offer-info.jsx';
import SignIn from '../sign-in/sign-in.jsx';

const SignInWrapped = withAuthFieldsChange(SignIn);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
  }

  handleOfferTitleClick(clickedOffer) {
    this.setState({clickedOffer});
  }

  renderApp() {
    const {
      authStatus,
      offers,
      cities,
      currentCity,
      currentSortingOption,
      activeOfferId,
      onSortingOptionChange,
      onOfferHover,
      onCityChange,
      onSignIn,
    } = this.props;

    const {clickedOffer} = this.state;

    if (clickedOffer) {
      return (
        <DetailedOfferInfo
          offer={clickedOffer}
          nearbyOffers={offers}
          onNearbyOfferTitleClick={this.handleOfferTitleClick}
        />
      );
    }

    if (authStatus === AuthStatus.NO_AUTH) {
      return (
        <SignInWrapped
          currentCity={currentCity}
          onSignIn={onSignIn}
        />
      );
    }

    if (authStatus === AuthStatus.AUTH) {
      return (
        <Main
          authStatus={authStatus}
          offers={offers}
          cities={cities}
          currentCity={currentCity}
          currentSortingOption={currentSortingOption}
          activeOfferId={activeOfferId}
          onOfferTitleClick={this.handleOfferTitleClick}
          onSortingOptionChange={onSortingOptionChange}
          onOfferHover={onOfferHover}
          onCityChange={onCityChange}
        />
      );
    }

    return {};
  }

  render() {
    const {
      offers,
      authStatus,
      user,
    } = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Page
              authStatus={authStatus}
              user={user}
            >
              {this.renderApp()}
            </Page>
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/dev-offer">
            <DetailedOfferInfo
              offer={offers[0]}
              nearbyOffers={offers}
              onNearbyOfferTitleClick={this.handleOfferTitleClick}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

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
  onCityChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
  offers: getSortedOffers(state),
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
  onSignIn(userData) {
    dispatch(UserOperation.signIn(userData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
