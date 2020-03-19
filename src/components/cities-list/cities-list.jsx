import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../action-creator/action-creator';

const CitiesList = (props) => {
  const {
    offers,
    currentCity,
    onCityChange,
  } = props;

  const cities = Object.keys(offers).map((city) => offers[city].city);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item${city.name === currentCity.name ? ` tabs__item--active` : ``}`}
                href="#"
                onClick={() => onCityChange(offers, city)}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  offers: PropTypes.object.isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.currentCity,
});

const mapDispatchToProps = (dispatch) => ({
  onCityChange(offers, city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.filterOffers(offers, city));
  },
});

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
