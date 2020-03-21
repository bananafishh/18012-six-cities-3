import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {getSortedOffers} from '../../utils';
import {ActionCreator} from '../../action-creator/action-creator';

import Main from '../main/main.jsx';
import DetailedOfferInfo from '../detailed-offer-info/detailed-offer-info.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
  }

  handleOfferTitleClick(clickedOfferId) {
    this.setState({clickedOfferId});
  }

  renderApp() {
    const {
      offers,
      currentCity,
      currentSortingOption,
      onSortingOptionChange,
    } = this.props;

    const {clickedOfferId} = this.state;

    if (clickedOfferId) {
      const clickedOffer = offers.find((offer) => offer.id === clickedOfferId);

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
        currentCity={currentCity}
        currentSortingOption={currentSortingOption}
        onOfferTitleClick={this.handleOfferTitleClick}
        onSortingOptionChange={onSortingOptionChange}
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
    pictureSrc: PropTypes.string,
    ratingStarsCount: PropTypes.number,
    isPremium: PropTypes.bool,
    isBookmarked: PropTypes.bool,
  })).isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  currentSortingOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  onSortingOptionChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getSortedOffers(state),
  currentCity: state.currentCity,
  currentSortingOption: state.currentSortingOption,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingOptionChange(option) {
    dispatch(ActionCreator.changeSortingOption(option));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
