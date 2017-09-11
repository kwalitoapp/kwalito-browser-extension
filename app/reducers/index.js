import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import kwalito from './kwalito';

export default combineReducers({
  kwalito,
  router: routerReducer
});
