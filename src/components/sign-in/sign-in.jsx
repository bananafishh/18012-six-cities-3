import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import {AuthStatus, AppRoute} from '../../constants';

const SignIn = (props) => {
  const {
    authStatus,
    currentCity,
    email,
    password,
    onChange,
    onSignIn,
  } = props;

  if (authStatus === AuthStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT}/>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onSignIn({email, password});
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>

          <form
            className="login__form form"
            action="#"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>

              <input
                required
                className="login__input form__input"
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
              />
            </div>

            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>

              <input
                required
                className="login__input form__input"
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
            </div>

            <button className="login__submit form__submit button" type="submit">
              Sign in
            </button>
          </form>
        </section>

        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{currentCity}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

SignIn.propTypes = {
  authStatus: PropTypes.string.isRequired,
  currentCity: PropTypes.string.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
