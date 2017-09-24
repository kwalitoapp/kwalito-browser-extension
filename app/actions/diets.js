import * as types from '../constants/ActionTypes';

export function toggleSelect(id) {
  return { type: types.DIET_TOGGLE_SELECT, id };
}
