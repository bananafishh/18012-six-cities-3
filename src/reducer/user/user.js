import {extend} from '../../utils';
import {AuthorizationStatus} from '../../constants';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
};

const ActionType = {
  REQUIRE_AUTHORIZATION: `REQUIRE_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (authorizationStatus) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: authorizationStatus,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return extend(state, {authorizationStatus: action.payload});

    default:
      return state;
  }
};

export {ActionType, ActionCreator, reducer};
