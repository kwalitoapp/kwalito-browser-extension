import * as types from '../constants/ActionTypes';

export function display(content) {
  return { type: types.RIGHT_SIDE_BAR_DISPLAY, content };
}
export function toggle() {
  return { type: types.RIGHT_SIDE_BAR_TOGGLE };
}
