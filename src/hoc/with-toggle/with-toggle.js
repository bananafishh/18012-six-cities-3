import React, {PureComponent} from 'react';

const withToggle = (Component) => {
  class WithToggle extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {isOpen: false};

      this.handleToggleButtonClick = this.handleToggleButtonClick.bind(this);
    }

    handleToggleButtonClick() {
      this.setState((prevState) => ({isOpen: !prevState.isOpen}));
    }

    render() {
      return (
        <Component
          {...this.props}
          isOpen={this.state.isOpen}
          onToggleButtonClick={this.handleToggleButtonClick}
        />
      );
    }
  }

  return WithToggle;
};

export default withToggle;
