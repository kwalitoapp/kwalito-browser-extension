import * as ActionTypes from '../constants/ActionTypes';

const initialState = {
    active: false,
    content: undefined
};

const actionsMap = {
    [ActionTypes.RIGHT_SIDE_BAR_DISPLAY]: (state, action) => {
        return Object.assign({}, state, {
            active: true,
            content: action.content
        });
    },
    [ActionTypes.RIGHT_SIDE_BAR_TOGGLE]: (state) => {
        return Object.assign({}, state, { active: !state.active });
    }
};

export default function rightSideBar(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
    if (!reduceFn) return state;
    return reduceFn(state, action);
}
