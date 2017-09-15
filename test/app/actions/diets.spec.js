import test from 'ava';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/diets';

test('select should create DIET_SELECT action', t => {
  const id = 42;
  const actionResult = actions.select(id);
  t.is(typeof actionResult, 'object');
  t.is(actionResult.type, types.DIET_SELECT);
  t.is(actionResult.id, id);
});

test('deselect should create DIET_DESELECT action', t => {
  const id = 42;
  const actionResult = actions.deselect(id);
  t.is(typeof actionResult, 'object');
  t.is(actionResult.type, types.DIET_DESELECT);
  t.is(actionResult.id, id);
});

test('moreInfo should create DIET_MORE_INFO action', t => {
  const id = 42;
  const actionResult = actions.moreInfo(id);
  t.is(typeof actionResult, 'object');
  t.is(actionResult.type, types.DIET_MORE_INFO);
  t.is(actionResult.id, id);
});
