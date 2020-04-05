import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withAuthFieldsChange from './with-auth-fields-change';

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
  } = props;

  return (
    <form>
      <input type="email" name="email" className="email-input" value={email} onChange={onEmailChange}/>
      <input type="password" name="password" className="password-input" value={password} onChange={onPasswordChange}/>
    </form>
  );
};

MockComponent.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

const MockComponentWrapped = withAuthFieldsChange(MockComponent);

const userAuthData = {
  email: `Oliver.conner@gmail.com`,
  password: `123qwerty`,
};

describe(`HOC «withAuthFieldsChange» работает корректно`, () => {
  it(`При вводе/изменении значения в поле ввода email вызывается коллбэк, в который передаётся введённое значение`, () => {
    const mockComponent = mount(<MockComponentWrapped/>);

    const event = {target: {value: userAuthData.email}};

    const emailInput = mockComponent.find(`.email-input`);

    emailInput.simulate(`change`, event);
    expect(emailInput.instance().value).toBe(userAuthData.email);
  });

  it(`При вводе/изменении значения в поле ввода пароля вызывается коллбэк, в который передаётся введённое значение`, () => {
    const mockComponent = mount(<MockComponentWrapped/>);

    const event = {target: {value: userAuthData.password}};

    const passwordInput = mockComponent.find(`.password-input`);

    passwordInput.simulate(`change`, event);
    expect(passwordInput.instance().value).toBe(userAuthData.password);
  });
});
