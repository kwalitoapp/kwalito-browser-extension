import { applyMiddleware, createStore, compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (initialState, historyMiddleware, kwalitoMiddleware) => {
  const composer = (process.env.NODE_ENV === 'development'
    ? require('remote-redux-devtools').composeWithDevTools
    : compose);
  const enhancer = composer(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    applyMiddleware(kwalitoMiddleware)
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
