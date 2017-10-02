import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import kwalito from '../../../app/reducers/kwalito';

const expect = chai.expect;

describe('Reducers: Kwalito', () => {
  it('should handle initial state', () => {
    const state = kwalito(undefined, {});
    expect(Array.isArray(state)).to.equal(true);
  });

  it('should handle DIET_TOGGLE_SELECT', () => {
    const id = 42;
    const stateInit = [{ id }];

    const stateSelected = kwalito(stateInit, { type: types.DIET_TOGGLE_SELECT, id });
    expect(stateSelected).to.have.length(1);
    expect(stateSelected).to.eql([{ id, selected: true }]);

    const stateDeselected = kwalito(stateSelected, { type: types.DIET_TOGGLE_SELECT, id });
    expect(stateDeselected).to.have.length(1);
    expect(stateDeselected).to.eql([{ id, selected: false }]);

    const stateReselect = kwalito(stateDeselected, { type: types.DIET_TOGGLE_SELECT, id });
    expect(stateReselect).to.have.length(1);
    expect(stateReselect).to.eql([{ id, selected: true }]);
  });
});
