import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer/app/app';
import {getSortedOffers, getCities} from '../../reducer/data/selector';
import {getCurrentCity, getCurrentSortingOption, getActiveOfferId} from '../../reducer/app/selector';

import Main from '../main/main.jsx';
import DetailedOfferInfo from '../detailed-offer-info/detailed-offer-info.jsx';

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
      offers,
      cities,
      currentCity,
      currentSortingOption,
      activeOfferId,
      onSortingOptionChange,
      onOfferHover,
      onCityChange
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

    return (
      <Main
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

  render() {
    const {offers} = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
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
  onSortingOptionChange: PropTypes.func.isRequired,
  onOfferHover: PropTypes.func,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getSortedOffers(state),
  cities: getCities(state),
  currentCity: getCurrentCity(state),
  currentSortingOption: getCurrentSortingOption(state),
  activeOfferId: getActiveOfferId(state),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
