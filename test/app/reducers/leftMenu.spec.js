import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import leftMenu from '../../../app/reducers/leftMenu';

const expect = chai.expect;

describe('Reducers: Left Menu', () => {
  it('should handle empty initial state', () => {
    const state = leftMenu(undefined, {});
    expect(state.active).to.equal(false);
  });

  it('should handle LEFT_MENU_TOGGLE', () => {
    const stateSelected = leftMenu(undefined, { type: types.LEFT_MENU_TOGGLE });
    expect(stateSelected.active).to.equal(true);

    const stateDeselected = leftMenu(stateSelected, { type: types.LEFT_MENU_TOGGLE });
    expect(stateDeselected.active).to.equal(false);
  });
});
