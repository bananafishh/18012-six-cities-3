import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {getCityOffers} from '../../utils';

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
        currentCity={currentCity}
        offers={offers}
        onOfferTitleClick={this.handleOfferTitleClick}
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
};

const mapStateToProps = (state) => ({
  offers: getCityOffers(state),
  currentCity: state.currentCity,
});

export default connect(mapStateToProps)(App);
