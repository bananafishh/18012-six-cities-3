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
            <li key={city} className="locations__item">
              <a
                className={`locations__item-link tabs__item${city === currentCity ? ` tabs__item--active` : ``}`}
                href="#"
                onClick={() => onCityChange(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityChange: PropTypes.func.isRequired,
};

export default CitiesList;
