import React from 'react';
import PropTypes from 'prop-types';

const SortingOptions = (props) => {
  const handleOptionClick = (option) => {
    const {
      onOptionChange,
      onToggleButtonClick,
    } = props;

    onOptionChange(option);
    onToggleButtonClick();
  };

  const {
    options,
    currentOption: {
      value,
      label,
    },
    isOpen,
    onToggleButtonClick,
  } = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      {` `}
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={onToggleButtonClick}
      >
        {label}
        <svg className={`places__sorting-arrow${isOpen ? ` places__sorting-arrow--up` : ``}`} width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom${isOpen ? ` places__options--opened` : ``}`}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`places__option${option.value === value ? ` places__option--active` : ``}`}
            tabIndex="0"
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
};

SortingOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
  currentOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  onOptionChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleButtonClick: PropTypes.func.isRequired,
};

export default SortingOptions;
