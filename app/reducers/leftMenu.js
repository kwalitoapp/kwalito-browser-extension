import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    active: false
};

const actionsMap = {
    [ActionTypes.LEFT_MENU_TOGGLE]: (state) => {
        return Object.assign({}, state, { active: !state.active });
    }
};

export default function leftMenu(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
    if (!reduceFn) return state;
    return reduceFn(state, action);
}
