import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createApi} from './api';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation, ActionCreator} from './reducer/user/user';
import reducer from './reducer/reducer';
import {AuthStatus} from './constants';

import App from './components/app/app.jsx';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.changeAuthStatus(AuthStatus.NO_AUTH));
};

const api = createApi(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuthStatus());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
