import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';

const offerTitleClickHandler = () => {};

const App = (props) => {
  const {
    offersCount,
    offerTitles
  } = props;

  return (
    <Main
      offersCount={offersCount}
      offerTitles={offerTitles}
      onOfferTitleClick={offerTitleClickHandler}
    />
  );
};

App.propTypes = {
  offersCount: PropTypes.number,
  offerTitles: PropTypes.arrayOf(PropTypes.string)
};

export default App;
