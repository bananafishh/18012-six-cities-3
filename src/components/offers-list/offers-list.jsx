import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends PureComponent {
  render() {
    const {
      offers,
      offerMix,
      imgSize,
      authStatus,
      history,
      onOfferHover,
      onBookmarkClick,
    } = this.props;

    if (!offers.length) {
      return null;
    }

    return (
      <>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            mix={offerMix}
            imgSize={imgSize}
            offer={offer}
            authStatus={authStatus}
            history={history}
            onHover={onOfferHover}
            onBookmarkClick={onBookmarkClick}
          />
        ))}
      </>
    );
  }
}

OffersList.propTypes = {
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
  offerMix: PropTypes.shape({
    card: PropTypes.string,
    info: PropTypes.string,
    img: PropTypes.string,
  }),
  imgSize: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
  authStatus: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onOfferHover: PropTypes.func,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default OffersList;
