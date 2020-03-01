import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOfferTitleClick = this.handleOfferTitleClick.bind(this);
  }

  handleOfferTitleClick() {}

  render() {
    const {
      offers,
    } = this.props;

    return (
      <Main
        offers={offers}
        onOfferTitleClick={this.handleOfferTitleClick}
      />
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
};

export default App;
