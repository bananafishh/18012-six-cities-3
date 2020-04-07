import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {AuthStatus} from '../../constants';

import SignIn from './sign-in';

configure({adapter: new Adapter()});

const currentCity = `Amsterdam`;

const userAuthData = {
  email: `Oliver.conner@gmail.com`,
  password: `123qwerty`,
};

describe(`Компонент «SignIn» работает корректно`, () => {
  it(`При отправке формы авторизации вызывается коллбэк, в который передаются введённые данные`, () => {
    const handleSignIn = jest.fn();
    const event = {preventDefault: () => {}};

    const signIn = shallow(
        <SignIn
          authStatus={AuthStatus.NO_AUTH}
          currentCity={currentCity}
          email={userAuthData.email}
          password={userAuthData.password}
          onChange={() => {}}
          onSignIn={handleSignIn}
        />
    );

    const signInForm = signIn.find(`.login__form`);

    signInForm.simulate(`submit`, event);
    expect(handleSignIn).toHaveBeenCalledTimes(1);
    expect(handleSignIn.mock.calls[0][0]).toEqual(userAuthData);
  });
});
