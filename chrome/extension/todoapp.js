import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import createStore from '../../app/store/configureStore';
import databases from '../../app/databases';
import App from '../../app/containers/App';
import './todoapp.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  // Build the middleware for intercepting and dispatching navigation actions
  const historyMiddleware = routerMiddleware(history);
  databases('http://localhost:5984')
    .then((storageMiddleware) => {
      ReactDOM.render(
        <App
          store={createStore(initialState, historyMiddleware, storageMiddleware)}
          history={history}
        />,
        document.querySelector('#root')
      );
    })
  ;
});
