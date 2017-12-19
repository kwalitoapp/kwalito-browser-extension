import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default (initialState, historyMiddleware, kwalitoMiddleware) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    applyMiddleware(kwalitoMiddleware)
  ));
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
