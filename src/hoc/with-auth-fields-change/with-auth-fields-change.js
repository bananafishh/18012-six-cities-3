import React, {PureComponent} from 'react';

const withAuthFieldsChange = (Component) => (
  class WithAuthFieldsChange extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        email: ``,
        password: ``,
      };

      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(e) {
      this.setState({email: e.target.value});
    }

    handlePasswordChange(e) {
      this.setState({password: e.target.value});
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
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
        />
      );
    }
  }
);

export default withAuthFieldsChange;
