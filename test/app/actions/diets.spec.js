import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/diets';

const expect = chai.expect;

describe('Actions: Diets', () => {
  it('select should create DIET_TOGGLE_SELECT action', () => {
    const id = 42;
    expect(actions.toggleSelect(id)).to.deep.equal({ type: types.DIET_TOGGLE_SELECT, id });
  });
});
