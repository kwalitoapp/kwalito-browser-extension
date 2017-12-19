import chai from 'chai';
import _ from 'lodash';
import * as ActionTypes from '../../../app/constants/ActionTypes';
import kwalito, {initialState, actionsMap, checkState} from '../../../app/reducers/kwalito';

const expect = chai.expect;

describe('Reducers: Kwalito', () => {
  it('should declare initial state with the right shape', () => {
    expect(typeof initialState).to.equal('object');
    expect(initialState).to.deep.equal({
      diets: [],
      user: {diets: {}, ingredients: []},
      errors: {}
    });
  });
  describe('Action map', () => {
    const availableActions = [
      ActionTypes.USER_SIGNIN,
      ActionTypes.USER_SIGNUP,
      ActionTypes.KWALITO_UPDATE_STATE
    ];
    it('should declare the right actions', () => {
      expect(Object.keys(actionsMap)).to.deep.equal(availableActions);
    });

    it('should update the state with \'USER_SIGNIN\'', () => {
      const action = {
        user: {anonymous: false, diets: {}},
        error: {message: 'Ooooooops'},
        somethingElse: 'that should not be'
      };
      const newState = actionsMap[ActionTypes.USER_SIGNIN](initialState, action);
      expect(newState).to.deep.equal(
        _.merge({}, initialState, {user: action.user, errors: {sign: action.error}}));
      expect(newState).to.not.equal(initialState);
    });

    it('should update the state with \'USER_SIGNUP\'', () => {
      const action = {
        user: {anonymous: false, diets: {}},
        error: {message: 'Ooooooops'},
        somethingElse: 'that should not be'
      };
      const newState = actionsMap[ActionTypes.USER_SIGNUP](_.cloneDeep(initialState), action);
      expect(newState)
        .to.deep.equal(_.merge({}, initialState, {user: action.user, errors: {sign: action.error}}));
      expect(newState).to.not.equal(initialState);
    });

    it('should update the state with \'KWALITO_UPDATE_STATE\'', () => {
      const action = {
        state: {
          user: {anonymous: false, diets: {}},
          error: {message: 'Ooooooops'}
        },
        somethingElse: 'that should not be',
        method: 'merge'
      };
      const newState = actionsMap[ActionTypes.KWALITO_UPDATE_STATE](_.cloneDeep(initialState), action);
      expect(newState)
        .to.deep.equal(_.merge({}, initialState, action.state));
      expect(newState).to.not.equal(initialState);
    });
  });
  describe('State checker', () => {
    it('should add any missing field', () => {
      const state = {};
      const newState = checkState(state);
      expect(newState).to.not.equal(initialState);
      expect(newState).to.deep.equal(initialState);
    });

    it('should return the same object if it is complete', () => {
      const state = _.cloneDeep(initialState);
      const newState = checkState(state);
      expect(newState).to.equal(state);
    });

    it('should keep additional fields when completing', () => {
      const state = {somethingElse: 'very important'};
      const newState = checkState(state);
      expect(newState).to.deep.equal(_.merge({}, initialState, state));
    });
  });
  describe('Action dispatcher', () => {
    it('should handle empty initial state', () => {
      const state = kwalito(undefined, {});
      expect(state).to.deep.equal(initialState);
      expect(state).to.not.equal(initialState);
    });

    it('should return the same object if no action is taken', () => {
      const state = _.cloneDeep(initialState);
      const newState = kwalito(state, {});
      expect(newState).to.equal(state);
      expect(newState).to.deep.equal(initialState);
    });

    it('should return another object if any action is taken', () => {
      const state = _.cloneDeep(initialState);
      const newState = kwalito(state, {type: ActionTypes.KWALITO_UPDATE_STATE, method: 'merge'});
      expect(newState).to.not.equal(state);
    });
  });
});
