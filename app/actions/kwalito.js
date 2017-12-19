import * as types from '../constants/ActionTypes';

export function signIn({ login, password, next }) {
  return { type: types.USER_SIGNIN, login, password, next };
}

export function signUp({ login, password, userInfo, next }) {
  return { type: types.USER_SIGNUP, login, password, userInfo, next };
}

export function signOut() {
  return { type: types.USER_SIGNOUT };
}

export function toggleSelect(id) {
  return { type: types.DIET_TOGGLE_SELECT, id };
}

export function setOptions(id, options) {
  return { type: types.DIET_SET_OPTIONS, id, options };
}

export function ingredientSearch(query) {
  return { type: types.INGREDIENT_SEARCH, query };
}

export function ingredientAdd(ingredient) {
  return { type: types.INGREDIENT_ADD, ingredient };
}

export function ingredientRemove(ingredient) {
  return { type: types.INGREDIENT_REMOVE, ingredient };
}

export function updateState(state, method = 'merge') {
  return { type: types.KWALITO_UPDATE_STATE, state, method };
}
