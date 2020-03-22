import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  const {
    cities,
    currentCity,
    onCityChange,
  } = props;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a
                className={`locations__item-link tabs__item${city.name === currentCity.name ? ` tabs__item--active` : ``}`}
                href="#"
                onClick={() => onCityChange(city)}
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
  cities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  })).isRequired,
  currentCity: PropTypes.shape({
    name: PropTypes.string,
    coords: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
