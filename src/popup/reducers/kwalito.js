import * as ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';

export const initialState = {
  diets: [],
  user: {diets: {}, ingredients: []},
  errors: {}
};

export const actionsMap = {
  [ActionTypes.USER_SIGNIN]: (state, action) =>
    _.merge({}, state, {user: action.user, errors: {sign: action.error}}),
  [ActionTypes.USER_SIGNUP]: (state, action) =>
    _.merge({}, state, {user: action.user, errors: {sign: action.error}}),
  [ActionTypes.KWALITO_UPDATE_STATE]: (state, action) => (_[action.method]({}, state, action.state))
};

export const checkState = (state) => {
  let newState;
  let hasMissingMembers = false;
  Object.keys(initialState).forEach((key) => {
    if(!(key in state)) {
      hasMissingMembers = true;
    }
  });
  if(hasMissingMembers){
    newState = _.merge({}, initialState, state);
  }
  newState = newState || state;
  return newState;
};

export default function kwalito(state = _.cloneDeep(initialState), action) {
  const reduceFn = actionsMap[action.type];
  const checkedState = checkState(state);
  if (!reduceFn) return checkedState;
  return reduceFn(checkedState, action);
}
