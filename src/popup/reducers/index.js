import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import kwalito from './kwalito';
import leftMenu from './leftMenu';
import rightSideBar from './rightSideBar';

export default combineReducers({
    kwalito,
    leftMenu,
    rightSideBar,
    router: routerReducer
});
