import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import {createApi} from './api';
import {Operation as DataOperation} from './reducer/data/data';
import reducer from './reducer/reducer';

import App from './components/app/app.jsx';

const api = createApi(() => {});

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadOffers());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById(`root`)
);
