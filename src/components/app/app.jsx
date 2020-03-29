import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {getSortedOffers, getCities} from '../../utils';
import {ActionCreator} from '../../reducer/app/app';

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
          currentCity={currentCity}
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
    const {
      offers,
      currentCity,
    } = this.props;

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
              currentCity={currentCity}
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
    pictureSrc: PropTypes.string,
    ratingStarsCount: PropTypes.number,
    isPremium: PropTypes.bool,
    isBookmarked: PropTypes.bool,
  })).isRequired,
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
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
  currentCity: state.currentCity,
  currentSortingOption: state.currentSortingOption,
  activeOfferId: state.activeOfferId,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
  onSortingOptionChange(option) {
    dispatch(ActionCreator.changeSortingOption(option));
  },
  onOfferHover(offerId) {
    dispatch(ActionCreator.changeActiveOffer(offerId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
