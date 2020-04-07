import {extend} from '../../utils';
import {AuthStatus} from '../../constants';
import UserDataAdapter from '../../adapters/user-data-adapter';

const initialState = {
  authStatus: AuthStatus.NO_AUTH,
  user: {},
};

const ActionType = {
  CHANGE_AUTH_STATUS: `CHANGE_AUTH_STATUS`,
  SET_USER: `SET_USER`,
};

const ActionCreator = {
  changeAuthStatus: (authStatus) => ({
    type: ActionType.CHANGE_AUTH_STATUS,
    payload: authStatus,
  }),
  setUser: (userData) => ({
    type: ActionType.SET_USER,
    payload: userData,
  }),
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        const userData = UserDataAdapter.parseData(response.data);

        dispatch(ActionCreator.changeAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.setUser(userData));
      })
      .catch((err) => {
        throw err;
      });
  },
  signIn: (userAuthData) => (dispatch, getState, api) => {
    return api.post(`/login`, userAuthData)
      .then((response) => {
        const userData = UserDataAdapter.parseData(response.data);

        dispatch(ActionCreator.changeAuthStatus(AuthStatus.AUTH));
        dispatch(ActionCreator.setUser(userData));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_AUTH_STATUS:
      return extend(state, {authStatus: action.payload});

    case ActionType.SET_USER:
      return extend(state, {user: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, Operation, reducer};
