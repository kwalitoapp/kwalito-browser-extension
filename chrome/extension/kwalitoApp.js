import React from 'react';
import ReactDOM from 'react-dom';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import createStore from '../../app/store/configureStore';
import { kwalitoMiddleware } from '../../app/middlewares';
import App from '../../app/containers/App';
import './kwalitoApp.css';
import KwalitoSDK from '../../kwalito-sdk';
import {remoteCouchBaseUrl} from '../../app/constants';

chrome.storage.local.get('state', (obj) => {
  console.log('STATE FROM LOCAL STORAGE:', obj);
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  // Create a history of your choosing (we're using a browser history in this case)
  const history = createHistory();

  // Build the middleware for intercepting and dispatching navigation actions
  const historyMiddleware = routerMiddleware(history);
  const kwalitoSDK = new KwalitoSDK(remoteCouchBaseUrl);
  return kwalitoSDK.init()
    .then((user) => {
      console.log('USER:', user);
      initialState.kwalito = initialState.kwalito || {};
      initialState.kwalito.user = user;
      return kwalitoSDK.dietGetAll();
    })
    .then((allDiets) => {
      initialState.kwalito.diets = allDiets;
      ReactDOM.render(
        <App
          store={createStore(initialState, historyMiddleware, kwalitoMiddleware(kwalitoSDK, history))}
          history={history}
        />,
        document.querySelector('#root')
      );
    })
    ;
});
