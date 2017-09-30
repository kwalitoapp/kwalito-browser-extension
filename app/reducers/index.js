import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { authStateReducer } from 'redux-auth';

import kwalito from './kwalito';

export default combineReducers({
  kwalito,
  router: routerReducer,
  auth: authStateReducer
});
