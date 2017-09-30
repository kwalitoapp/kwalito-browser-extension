import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import storage from '../utils/storage';

export default function (initialState, historyMiddleware) {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk),
    applyMiddleware(historyMiddleware),
    storage()
  ));

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
