import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  render() {
    const {
      offers,
      onOfferTitleClick,
      mix,
      offerMix,
      onOfferHover,
    } = this.props;

    if (!offers.length) {
      return null;
    }

    return (
      <div className={mix}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            mix={offerMix}
            offer={offer}
            onTitleClick={onOfferTitleClick}
            onHover={onOfferHover}
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
  mix: PropTypes.string,
  offerMix: PropTypes.string,
  onOfferHover: PropTypes.func,
};

export default OffersList;
