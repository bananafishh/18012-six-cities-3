import React from 'react';
import PropTypes from 'prop-types';

import {AuthStatus, BASE_URL} from '../../constants';

const Page = (props) => {
  const {
    children,
    authStatus,
    user: {
      email,
      avatarUrl
    },
  } = props;

  const getPageClass = () => {
    if (authStatus === AuthStatus.NO_AUTH) {
      return `page--gray page--login`;
    }

    return ``;
  };

  const renderHeaderNavLink = () => (
    authStatus === AuthStatus.AUTH
      ? (
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: `url(${BASE_URL}${avatarUrl})`,
            }}
          >
          </div>

          <span className="header__login">{email}</span>
        </a>
      ) : (
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </a>
      )
  );

  return (
    <div className={`page ${getPageClass()}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  {renderHeaderNavLink()}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  authStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
};

export default Page;
