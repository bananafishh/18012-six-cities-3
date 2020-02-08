import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const offersCount = 312;

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

ReactDOM.render(
    <App
      offersCount={offersCount}
      offerTitles={offerTitles}
    />,
    document.getElementById(`root`)
);
