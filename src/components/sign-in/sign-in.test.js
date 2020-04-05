import React from 'react';
import renderer from 'react-test-renderer';

import SignIn from './sign-in';

const currentCity = `Amsterdam`;

const userAuthData = {
  email: `Oliver.conner@gmail.com`,
  password: `123qwerty`,
};

it(`Компонент «SignIn» рендерится корректно`, () => {
  const tree = renderer
    .create(
        <SignIn
          currentCity={currentCity}
          email={userAuthData.email}
          password={userAuthData.password}
          onEmailChange={() => {}}
          onPasswordChange={() => {}}
          onSignIn={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
