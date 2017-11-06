import * as types from '../constants/ActionTypes';

export function signIn({ login, password, next }) {
  return { type: types.USER_SIGNIN, login, password, next };
}

export function signUp({ login, password }) {
  return { type: types.USER_SIGNUP, login, password, next };
}

export function toggleSelect(id) {
  return { type: types.DIET_TOGGLE_SELECT, id };
}
