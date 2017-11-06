import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import kwalito from '../../../app/reducers/kwalito';

const expect = chai.expect;

describe('Reducers: Kwalito', () => {
  it('should handle empty initial state', () => {
    const state = kwalito(undefined, {});
    expect(Array.isArray(state.diets)).to.equal(true);
  });

  it('should handle DIET_TOGGLE_SELECT', () => {
    const id = 42;
    const stateInit = { diets: [{ id }], user: null };

    const stateSelected = kwalito(stateInit, { type: types.DIET_TOGGLE_SELECT, id });
    stateInit.diets[0].selected = true;
    expect(stateSelected).to.eql(stateInit);

    const stateDeselected = kwalito(stateSelected, { type: types.DIET_TOGGLE_SELECT, id });
    stateInit.diets[0].selected = false;
    expect(stateDeselected).to.eql(stateInit);

    const stateReselect = kwalito(stateDeselected, { type: types.DIET_TOGGLE_SELECT, id });
    stateInit.diets[0].selected = true;
    expect(stateReselect).to.eql(stateInit);
  });
});
