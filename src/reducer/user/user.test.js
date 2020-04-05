import MockAdapter from "axios-mock-adapter";

import {createApi} from '../../api';
import {reducer, ActionType, Operation, ActionCreator} from './user';
import UserDataAdapter from '../../adapters/user-data-adapter';
import {AuthStatus} from '../../constants';

const api = createApi(() => {});

const apiUserData = {
  'avatar_url': `img/1.png`,
  'email': `Oliver.conner@gmail.com`,
  'id': 1,
  'is_pro': false,
  'name': `Oliver.conner`,
};

const userData = {
  avatarUrl: `img/1.png`,
  email: `Oliver.conner@gmail.com`,
  id: 1,
  isPro: false,
  name: `Oliver.conner`,
};

const userAuthData = {
  email: `Oliver.conner@gmail.com`,
  password: `123qwerty`,
};

describe(`Редьюсер «user» работает корректно`, () => {
  it(`Возвращает начальный стейт, если вызван без параметров`, () => {
    expect(reducer(void 0, {})).toEqual({
      authStatus: AuthStatus.NO_AUTH,
      user: {},
    });
  });

  it(`Изменяет статус авторизации на переданное значение`, () => {
    expect(reducer({
      authStatus: AuthStatus.NO_AUTH,
    }, {
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: AuthStatus.AUTH,
    })).toEqual({
      authStatus: AuthStatus.AUTH,
    });
  });

  it(`Изменяет данные пользователя на переданное значение`, () => {
    expect(reducer({
      user: {},
    }, {
      type: ActionType.SET_USER,
      payload: userData,
    })).toEqual({
      user: userData,
    });
  });
});

describe(`Загрузка данных с сервера происходит корректно`, () => {
  it(`Происходит корректный GET запрос к API по адресу /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthStatus = Operation.checkAuthStatus();
    const adaptedUserData = UserDataAdapter.parseData(apiUserData);

    apiMock
      .onGet(`/login`)
      .reply(200, apiUserData);

    return checkAuthStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTH_STATUS,
          payload: AuthStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: adaptedUserData,
        });
      });
  });

  it(`Происходит корректный POST запрос к API по адресу /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const signIn = Operation.signIn(userAuthData);
    const adaptedUserData = UserDataAdapter.parseData(apiUserData);

    apiMock
      .onPost(`/login`)
      .reply(200, apiUserData);

    return signIn(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_AUTH_STATUS,
          payload: AuthStatus.AUTH,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER,
          payload: adaptedUserData,
        });
      });
  });
});

describe(`Action creator работает корректно`, () => {
  it(`Action creator для изменения статуса авторизации возвращает правильный action`, () => {
    expect(ActionCreator.changeAuthStatus(AuthStatus.AUTH)).toEqual({
      type: ActionType.CHANGE_AUTH_STATUS,
      payload: AuthStatus.AUTH,
    });
  });

  it(`Action creator для изменения данных пользователя возвращает правильный action`, () => {
    expect(ActionCreator.setUser(userData)).toEqual({
      type: ActionType.SET_USER,
      payload: userData,
    });
  });
});
