import chai from 'chai';

import * as types from '../../app/constants/ActionTypes';
import * as kwalito from '../../app/actions/kwalito';
import * as leftMenu from '../../app/actions/leftMenu';
import * as rightSideBar from '../../app/actions/rightSideBar';

const expect = chai.expect;

describe('Actions', () => {
  describe('kwalito', () => {
    const id = 42;
    const login = 'me@mydomain.com';
    const password = 'myPassword';
    const userInfo = {firstName: 'John'};
    const options = {value: 1337};
    const next = '/next/route';
    const state = {user: {diets: [{name: 'Pizza-based'}]}};

    it('should declare the right amount of actions', () => {
      expect(Object.keys(kwalito).length).to.equal(9);
    });
    it('should create USER_SIGNIN action', () => {
      expect(kwalito.signIn({login, password, next})).to.deep.equal({
        type: types.USER_SIGNIN,
        login,
        password,
        next
      });
    });
    it('should create USER_SIGNUP action', () => {
      expect(kwalito.signUp({
        login,
        password,
        userInfo,
        next
      })).to.deep.equal({type: types.USER_SIGNUP, login, password, userInfo, next});
    });
    it('should create USER_SIGNOUT action', () => {
      expect(kwalito.signOut()).to.deep.equal({type: types.USER_SIGNOUT});
    });
    it('should create DIET_TOGGLE_SELECT action', () => {
      expect(kwalito.toggleSelect(id)).to.deep.equal({type: types.DIET_TOGGLE_SELECT, id});
    });
    it('should create DIET_SET_OPTIONS action', () => {
      expect(kwalito.setOptions(id, options)).to.deep.equal({
        type: types.DIET_SET_OPTIONS,
        id,
        options
      });
    });
    it('should create KWALITO_UPDATE_STATE action', () => {
      expect(kwalito.updateState(state)).to.deep.equal({
        type: types.KWALITO_UPDATE_STATE,
        state,
        method: 'merge'
      });
    });
  });

  describe('leftMenu', () => {
    it('should declare the right amount of actions', () => {
      expect(Object.keys(leftMenu).length).to.equal(1);
    });
    it('should create LEFT_MENU_TOGGLE action', () => {
      expect(leftMenu.toggle()).to.deep.equal({type: types.LEFT_MENU_TOGGLE});
    });
  });

  describe('rightSideBar', () => {
    it('should declare the right amount of actions', () => {
      expect(Object.keys(rightSideBar).length).to.equal(2);
    });
    it('should create RIGHT_SIDE_BAR_DISPLAY action', () => {
      const content = 'some content';
      expect(rightSideBar.display(content)).to.deep.equal({
        type: types.RIGHT_SIDE_BAR_DISPLAY,
        content
      });
    });
    it('should create LEFT_MENU_TOGGLE action', () => {
      expect(rightSideBar.toggle()).to.deep.equal({type: types.RIGHT_SIDE_BAR_TOGGLE});
    });
  });
});
