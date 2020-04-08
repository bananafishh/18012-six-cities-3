import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import {AppRoute, AuthStatus} from '../../constants';

const PrivateRoute = (props) => {
  const {
    render,
    path,
    exact,
    authStatus
  } = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authStatus === AuthStatus.AUTH
            ? render()
            : <Redirect to={AppRoute.SIGN_IN} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
