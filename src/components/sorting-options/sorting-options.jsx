import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class SortingOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    this.toggleSortingMenu = this.toggleSortingMenu.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  toggleSortingMenu() {
    this.setState((prevState) => ({isOpen: !prevState.isOpen}));
  }

  handleTitleClick() {
    this.toggleSortingMenu();
  }

  handleOptionClick(option) {
    this.props.onOptionChange(option);

    this.toggleSortingMenu();
  }

  render() {
    const {
      options,
      currentOption: {
        value,
        label,
      },
    } = this.props;

    const {isOpen} = this.state;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        {` `}
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={this.handleTitleClick}
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
              onClick={() => this.handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </form>
    );
  }
}

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
};

export default SortingOptions;
