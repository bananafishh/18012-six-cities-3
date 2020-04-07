import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import {AppRoute, AuthStatus, BASE_URL} from '../../constants';

const Page = (props) => {
  const {
    children,
    authStatus,
    user: {
      email,
      avatarUrl
    },
    history: {
      location: {
        pathname,
      }
    }
  } = props;

  const getPageClass = () => {
    switch (pathname) {
      case AppRoute.SIGN_IN:
        return `page page--gray page--login`;

      case AppRoute.ROOT:
        return `page page--gray page--main`;

      default:
        return `page`;
    }
  };

  const renderHeaderNavLink = () => (
    authStatus === AuthStatus.AUTH
      ? (
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.FAVORITES}
        >
          <div
            className="header__avatar-wrapper user__avatar-wrapper"
            style={{
              backgroundImage: `url(${BASE_URL}${avatarUrl})`,
            }}
          >
          </div>

          <span className="header__user-name user__name">{email}</span>
        </Link>
      ) : (
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.SIGN_IN}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      )
  );

  return (
    <div className={getPageClass()}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link
                className="header__logo-link header__logo-link--active"
                to={AppRoute.ROOT}
              >
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
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
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
};

export {Page};
export default withRouter(Page);
