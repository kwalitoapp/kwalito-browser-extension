import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/diets';

const expect = chai.expect;

describe('Actions: Diets', () => {
  it('select should create DIET_TOGGLE_SELECT action', () => {
    const id = 42;
    const actionResult = actions.toggleSelect(id);
    expect(typeof actionResult).to.equal('object');
    expect(actionResult.type).to.equal(types.DIET_TOGGLE_SELECT);
    expect(actionResult.id).to.equal(id);
  });
});
