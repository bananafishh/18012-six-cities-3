import React from 'react';
import PropTypes from 'prop-types';

import {pluralizeWord} from '../../utils';
import {SORTING_OPTIONS} from '../../constants';
import withToggle from '../../hoc/with-toggle/with-toggle';

import CitiesList from '../cities-list/cities-list.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import SortingOptions from '../sorting-options/sorting-options.jsx';
import NoOffers from '../no-offers/no-offers.jsx';

const SortingOptionsWrapped = withToggle(SortingOptions);

const Main = (props) => {
  const {
    offers,
    cities,
    currentCity,
    currentSortingOption,
    activeOfferId,
    onOfferTitleClick,
    onSortingOptionChange,
    onOfferHover,
    onCityChange,
  } = props;

  const offersLength = offers.length;

  const renderOffers = () => (
    offersLength ? (
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offersLength} {pluralizeWord(`place`, offersLength)} to stay in {currentCity}
        </b>

        <SortingOptionsWrapped
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
    ) : (
      <NoOffers city={currentCity}/>
    )
  );

  return (
    <main className={`page__main page__main--index${!offersLength ? ` page__main--index-empty` : ``}`}>
      <h1 className="visually-hidden">Cities</h1>

      <CitiesList
        cities={cities}
        currentCity={currentCity}
        onCityChange={onCityChange}
      />

      <div className="cities">
        <div className={`cities__places-container${!offersLength ? ` cities__places-container--empty` : ``} container`}>
          {renderOffers()}

          <div className="cities__right-section">
            {!!offersLength && (
              <section className="cities__map map">
                <Map
                  offers={offers}
                  activeOfferId={activeOfferId}
                />
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
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
    previewImage: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
  })).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentSortingOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  activeOfferId: PropTypes.number,
  onOfferTitleClick: PropTypes.func.isRequired,
  onSortingOptionChange: PropTypes.func.isRequired,
  onOfferHover: PropTypes.func,
  onCityChange: PropTypes.func.isRequired,
};

export default Main;
