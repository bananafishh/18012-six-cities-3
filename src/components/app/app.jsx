import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentOffersCount} = props;

  return (
    <Main rentOffersCount={rentOffersCount}/>
  );
};

export default App;
