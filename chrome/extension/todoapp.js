import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'

import Root from '../../app/containers/Root';
import './todoapp.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  // Build the middleware for intercepting and dispatching navigation actions
  const historyMiddleware = routerMiddleware(history);
  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root
      store={createStore(initialState, historyMiddleware)}
      history={history}
    />,
    document.querySelector('#root')
  );
});
