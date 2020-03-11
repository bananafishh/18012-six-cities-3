import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOfferHover = this.handleOfferHover.bind(this);
  }

  handleOfferHover(offerId) {
    this.setState({activeOfferCard: offerId});
  }

  render() {
    const {
      offers,
      onOfferTitleClick,
    } = this.props;

    if (!offers.length) {
      return null;
    }

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, index) => (
          <OfferCard
            key={`${offer.title}-${index}`}
            offer={offer}
            onOfferTitleClick={onOfferTitleClick}
            onOfferCardHover={this.handleOfferHover}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isBookmarked: PropTypes.bool,
  })).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OffersList;
