import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Operation} from '../../reducer/data/data';
import {getFavoriteCities, getFavoriteOffers} from '../../reducer/data/selector';
import {getAuthStatus} from '../../reducer/user/selector';
import {AppRoute} from '../../constants';

import OffersList from '../offers-list/offers-list.jsx';

class FavoriteOffers extends PureComponent {
  componentDidMount() {
    this.props.onFavoriteOffersLoad();
  }

  render() {
    const {
      offers,
      cities,
      authStatus,
      history,
      onBookmarkClick,
    } = this.props;

    const offersLength = offers.length;

    return (
      <>
        <main className={`page__main page__main--favorites${!offersLength ? ` page__main--favorites-empty` : ``}`}>
          {!!offersLength && (
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>

                <ul className="favorites__list">
                  {!!cities.length && cities.map((city, index) => (
                    <li key={`${city}-${index}`} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>

                      <div className="favorites__places">
                        <OffersList
                          offerMix={{
                            card: `favorites__card`,
                            info: `favorites__card-info`,
                            img: `favorites__image-wrapper`,
                          }}
                          imgSize={{
                            width: `150`,
                            height: `110`,
                          }}
                          offerInfoMix="favorites__card-info"
                          offers={offers.filter((offer) => offer.city.name === city)}
                          authStatus={authStatus}
                          history={history}
                          onBookmarkClick={onBookmarkClick}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

          {!offersLength && (
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>

                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>

                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan yor future trips.
                  </p>
                </div>
              </section>
            </div>
          )}
        </main>

        <footer className="footer container">
          <Link className="footer__logo-link" to={AppRoute.ROOT}>
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
          </Link>
        </footer>
      </>
    );
  }
}
FavoriteOffers.defaultProps = {
  cities: [],
};

FavoriteOffers.propTypes = {
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
  authStatus: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onFavoriteOffersLoad: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getFavoriteOffers(state),
  cities: getFavoriteCities(state),
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoriteOffersLoad() {
    dispatch(Operation.loadFavoriteOffers());
  },
  onBookmarkClick(offerId, isFavorite) {
    dispatch(Operation.toggleFavorite(offerId, isFavorite));
  },
});

export {FavoriteOffers};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteOffers);
