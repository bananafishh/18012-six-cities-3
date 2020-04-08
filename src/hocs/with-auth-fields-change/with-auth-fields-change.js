import React, {PureComponent} from 'react';

const withAuthFieldsChange = (Component) => (
  class WithAuthFieldsChange extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
      };

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
      const {name, value} = event.target;

      this.setState({[name]: value});
    }

    render() {
      const {
        email,
        password,
      } = this.state;

      return (
        <Component
          {...this.props}
          email={email}
          password={password}
          onChange={this.handleChange}
        />
      );
    }
  }
);

export default withAuthFieldsChange;
