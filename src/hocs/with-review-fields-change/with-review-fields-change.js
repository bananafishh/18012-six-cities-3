import React, {PureComponent} from 'react';

const withReviewFieldsChange = (Component) => (
  class WithReviewFieldsChange extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        review: ``,
        rating: 0,
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleChange(event) {
      const {name, value} = event.target;

      this.setState({[name]: value});
    }

    handleReset() {
      this.setState({
        review: ``,
        rating: 0,
      });
    }

    render() {
      const {
        review,
        rating,
      } = this.state;

      return (
        <Component
          {...this.props}
          review={review}
          rating={Number(rating)}
          onChange={this.handleChange}
          onReset={this.handleReset}
        />
      );
    }
  }
);

export default withReviewFieldsChange;
