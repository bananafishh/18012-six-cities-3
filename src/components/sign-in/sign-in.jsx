import React from 'react';
import PropTypes from 'prop-types';

const SignIn = (props) => {
  const {
    currentCity,
    email,
    password,
    onEmailChange,
    onPasswordChange,
    onSignIn,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();

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
                onChange={onEmailChange}
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
                onChange={onPasswordChange}
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
  currentCity: PropTypes.string.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
