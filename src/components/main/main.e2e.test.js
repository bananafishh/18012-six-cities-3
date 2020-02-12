import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main';

Enzyme.configure({
  adapter: new Adapter()
});

const offersCount = 312;

const offerTitles = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Canal View Prinsengracht`,
  `Nice, cozy, warm big bed apartment`,
  `Wood and stone place`
];

it(`При клике по заголовку карточки предложения по аренде вызывается коллбэк`, () => {
  const offerTitleClickHandler = jest.fn();

  const mainElement = shallow(
      <Main
        offersCount={offersCount}
        offerTitles={offerTitles}
        onOfferTitleClick={offerTitleClickHandler}
      />
  );

  const offerTitlesElements = mainElement.find(`.place-card__name`);
  offerTitlesElements.forEach((title) => title.simulate(`click`));

  expect(offerTitleClickHandler).toHaveBeenCalledTimes(offerTitlesElements.length);
});
