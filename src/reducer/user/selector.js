import NameSpace from '../name-space';

export const getAuthStatus = (state) => state[NameSpace.USER].authStatus;

export const getUserData = (state) => state[NameSpace.USER].user;
