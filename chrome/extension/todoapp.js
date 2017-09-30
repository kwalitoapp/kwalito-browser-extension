import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import App from '../../app/containers/App';
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
    <App
      store={createStore(initialState, historyMiddleware)}
      history={history}
    />,
    document.querySelector('#root')
  );
});
