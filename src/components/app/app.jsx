import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';

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
      currentOffers,
      currentCity,
    } = this.props;

    const {clickedOfferId} = this.state;

    if (clickedOfferId) {
      const clickedOffer = currentOffers.find((offer) => offer.id === clickedOfferId);

      return (
        <DetailedOfferInfo
          offer={clickedOffer}
          nearbyOffers={currentOffers}
          onNearbyOfferTitleClick={this.handleOfferTitleClick}
        />
      );
    }

    return (
      <Main
        currentCity={currentCity}
        currentOffers={currentOffers}
        onOfferTitleClick={this.handleOfferTitleClick}
      />
    );
  }

  render() {
    const {currentOffers} = this.props;

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
              offer={currentOffers[0]}
              nearbyOffers={currentOffers}
              onNearbyOfferTitleClick={this.handleOfferTitleClick}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  currentOffers: PropTypes.arrayOf(PropTypes.shape({
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
  currentCity: state.currentCity,
  currentOffers: state.currentOffers,
});

export default connect(mapStateToProps)(App);
