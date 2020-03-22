import React from 'react';
import PropTypes from 'prop-types';

import {pluralizeWord} from '../../utils';
import {SORTING_OPTIONS} from '../../constants';

import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import SortingOptions from '../sorting-options/sorting-options.jsx';

const Main = (props) => {
  const {
    offers,
    currentCity: {
      name,
      coords,
    },
    currentSortingOption,
    activeOfferId,
    onOfferTitleClick,
    onSortingOptionChange,
    onOfferHover,
  } = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList/>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} {pluralizeWord(`place`, offers.length)} to stay in {name}
              </b>

              <SortingOptions
                options={SORTING_OPTIONS}
                currentOption={currentSortingOption}
                onOptionChange={onSortingOptionChange}
              />

              <OffersList
                mix="cities__places-list places__list tabs__content"
                offerMix="cities__place-card"
                offers={offers}
                onOfferTitleClick={onOfferTitleClick}
                onOfferHover={onOfferHover}
              />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  center={coords}
                  offers={offers}
                  activeOfferId={activeOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

Main.defaultProps = {
  offers: [],
};

Main.propTypes = {
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
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  currentSortingOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  activeOfferId: PropTypes.number,
  onOfferTitleClick: PropTypes.func.isRequired,
  onSortingOptionChange: PropTypes.func.isRequired,
  onOfferHover: PropTypes.func,
};

export default Main;
