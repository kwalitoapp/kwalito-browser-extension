import * as types from '../constants/ActionTypes';

export function select(id) {
  return { type: types.DIET_SELECT, id };
}

export function deselect(id) {
  return { type: types.DIET_DESELECT, id };
}

export function moreInfo(id) {
  return { type: types.DIET_MORE_INFO, id };
}
