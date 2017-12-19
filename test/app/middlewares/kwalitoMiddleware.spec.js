import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import _ from 'lodash';
import kwalitoMiddleware, {middlewareActions} from '../../../app/middlewares/kwalitoMiddleware';
import * as actionTypes from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/kwalito';
import * as routes from '../../../app/utils/routes';

chai.use(require('chai-as-promised'));

describe('Middleware: kwalitoMiddleware', () => {
  const allActions = [
    actionTypes.USER_SIGNIN,
    actionTypes.USER_SIGNUP,
    actionTypes.USER_SIGNOUT,
    actionTypes.DIET_TOGGLE_SELECT,
    actionTypes.DIET_SET_OPTIONS
  ];
  const getUser = (args) => ({
    anonymous: true,
    creationDate: new Date('2017-11-26T21:13:01.244Z'),
    diets: {},
    ...args
  });
  const getLoggedInUser = (args) => getUser({
    anonymous: false,
    firstName: 'Jane',
    lastName: 'Doe',
    ...args
  });
  const getKwalitoSDK = (anonymousUser = getUser(), loggedInUser = getLoggedInUser()) => ({
    userLogin: sinon.stub().resolves(loggedInUser),
    userSignupOrLogin: sinon.stub().resolves(loggedInUser),
    userLogout: sinon.stub().resolves(anonymousUser),
    userGet: sinon.stub().resolves(anonymousUser),
    userDietUpdate: sinon.stub().resolves(anonymousUser)
  });
  const getHistory = () => ({
    push: sinon.spy(),
    replace: sinon.spy()
  });
  const getStore = () => ({
    dispatch: sinon.spy()
  });
  const getNext = () => sinon.spy();

  it('should declare the right actions', () => {
    expect(Object.keys(middlewareActions)).to.have.length(allActions.length);
    allActions.forEach((actionName) => {
      expect(typeof middlewareActions[actionName])
        .to.equal('function', `${actionName} is not a function`);
    });
  });

  describe('Actions', () => {
    describe('USER_SIGNIN', () => {
      it('should require a login', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: undefined,
          password: 'Password1!'
        };
        return expect(middlewareActions[actionTypes.USER_SIGNIN](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your login (email)');
      });

      it('should require a password', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: 'jane.doe@kwali.to',
          password: undefined
        };
        return expect(middlewareActions[actionTypes.USER_SIGNIN](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your password');
      });

      it('should call \'userLogin\' from the Kwalito SDK', () => {
        const kwalitoSDK = getKwalitoSDK();
        const action = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!'
        };
        return middlewareActions[actionTypes.USER_SIGNIN](kwalitoSDK, action)
          .then(() => {
            expect(kwalitoSDK.userLogin.calledOnce).to.equal(true);
            expect(kwalitoSDK.userLogin.args[0]).to.have.length(1);
            expect(kwalitoSDK.userLogin.args[0][0].login).to.equal(action.login);
            expect(kwalitoSDK.userLogin.args[0][0].password).to.equal(action.password);
          });
      });

      it('should add the logged in user to the current action', () => {
        const kwalitoSDK = getKwalitoSDK();
        const user = getLoggedInUser();
        const action = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!'
        };
        return middlewareActions[actionTypes.USER_SIGNIN](kwalitoSDK, action)
          .then(() => {
            expect(action.user).to.deep.equal(user);
          });
      });
    });

    describe('USER_SIGNUP', () => {
      it('should require a login', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: undefined,
          password: 'Password1!',
          userInfo: {
            firstName: 'Jane',
            lastName: 'Doe'
          }
        };
        return expect(middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your login (email)');
      });

      it('should require a password', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: 'jane.doe@kwali.to',
          password: undefined,
          userInfo: {
            firstName: 'Jane',
            lastName: 'Doe'
          }
        };
        return expect(middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your password');
      });

      it('should require a firstName in userInfo', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!',
          userInfo: {
            firstName: undefined,
            lastName: 'Doe'
          }
        };
        return expect(middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your first name');
      });

      it('should require a lastName in userInfo', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!',
          userInfo: {
            firstName: 'Jane',
            lastName: undefined
          }
        };
        return expect(middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('Please enter your last name');
      });

      it('should call \'userSignupOrLogin\' from the Kwalito SDK', () => {
        const kwalitoSDK = getKwalitoSDK();
        const action = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!',
          userInfo: {
            firstName: 'Jane',
            lastName: 'Doe'
          }
        };
        return middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, action)
          .then(() => {
            expect(kwalitoSDK.userSignupOrLogin.calledOnce).to.equal(true);
            expect(kwalitoSDK.userSignupOrLogin.args[0]).to.have.length(1);
            expect(kwalitoSDK.userSignupOrLogin.args[0][0].login).to.equal(action.login);
            expect(kwalitoSDK.userSignupOrLogin.args[0][0].password).to.equal(action.password);
            expect(kwalitoSDK.userSignupOrLogin.args[0][0].userInfo).to.equal(action.userInfo);
          });
      });

      it('should add the logged in user to the current action', () => {
        const kwalitoSDK = getKwalitoSDK();
        const user = getLoggedInUser();
        const action = {
          login: 'jane.doe@kwali.to',
          password: 'Password1!',
          userInfo: {
            firstName: 'Jane',
            lastName: 'Doe'
          }
        };
        return middlewareActions[actionTypes.USER_SIGNUP](kwalitoSDK, action)
          .then(() => {
            expect(action.user).to.deep.equal(user);
          });
      });
    });

    describe('USER_SIGNOUT', () => {
      it('should call \'userLogout\' from the Kwalito SDK', () => {
        const kwalitoSDK = getKwalitoSDK();
        const action = {};
        return middlewareActions[actionTypes.USER_SIGNOUT](kwalitoSDK, action)
          .then(() => {
            expect(kwalitoSDK.userLogout.calledOnce).to.equal(true);
          });
      });


      it('should add the anonymous user to the current action', () => {
        const kwalitoSDK = getKwalitoSDK();
        const user = getUser();
        const action = {};
        return middlewareActions[actionTypes.USER_SIGNOUT](kwalitoSDK, action)
          .then(() => {
            expect(action.user).to.deep.equal(user);
          });
      });
    });

    describe('DIET_TOGGLE_SELECT', () => {
      it('should require the id of the diet', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          id: undefined
        };
        return expect(middlewareActions[actionTypes.DIET_TOGGLE_SELECT](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('The id of the diet is mandatory');
      });

      it('should call \'userDietUpdate\' from the Kwalito SDK', () => {
        const dietId = 42;
        const user = getLoggedInUser({
          diets: {[dietId]: {selected: false}}
        });
        const kwalitoSDK = getKwalitoSDK(undefined, user);
        kwalitoSDK.userGet = sinon.stub().resolves(user);
        const action = {
          id: dietId
        };
        const store = getStore();
        return middlewareActions[actionTypes.DIET_TOGGLE_SELECT](kwalitoSDK, action, store)
          .then(() => {
            expect(kwalitoSDK.userDietUpdate.calledOnce).to.equal(true);
            expect(kwalitoSDK.userDietUpdate.args[0]).to.have.length(1);
            expect(kwalitoSDK.userDietUpdate.args[0][0]).to.deep.equal({[dietId]: {selected: true}});
          });
      });

      it('should dispatch the \'updateState\' action', () => {
        const dietId = 42;
        const user = getLoggedInUser({
          diets: {[dietId]: {selected: false}}
        });
        const kwalitoSDK = getKwalitoSDK(undefined, user);
        kwalitoSDK.userGet = sinon.stub().resolves(user);
        const action = {
          id: dietId
        };
        const store = getStore();
        return middlewareActions[actionTypes.DIET_TOGGLE_SELECT](kwalitoSDK, action, store)
          .then(() => {
            expect(store.dispatch.calledOnce).to.equal(true);
            expect(store.dispatch.args[0]).to.have.length(1);
            expect(store.dispatch.args[0][0]).to.deep.equal(actions.updateState({user}));
          });
      });
    });

    describe('DIET_SET_OPTIONS', () => {
      it('should require the id of the diet', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          id: undefined,
          options: {id: 42}
        };
        return expect(middlewareActions[actionTypes.DIET_SET_OPTIONS](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('The id of the diet is mandatory');
      });

      it('should require the options of the diet', () => {
        const kwalitoSDK = getKwalitoSDK();
        const actions = {
          id: 42,
          options: undefined
        };
        return expect(middlewareActions[actionTypes.DIET_SET_OPTIONS](kwalitoSDK, actions))
          .to.eventually.be.rejectedWith('The options of the diet is mandatory');
      });

      it('should call \'userDietUpdate\' from the Kwalito SDK', () => {
        const dietId = 42;
        const optionId = 24;
        const user = getLoggedInUser({
          diets: {[dietId]: {selected: false}}
        });
        const kwalitoSDK = getKwalitoSDK(undefined, user);
        kwalitoSDK.userGet = sinon.stub().resolves(user);
        const action = {
          id: dietId,
          options: {id: optionId}
        };
        const store = getStore();
        return middlewareActions[actionTypes.DIET_SET_OPTIONS](kwalitoSDK, action, store)
          .then(() => {
            expect(kwalitoSDK.userDietUpdate.calledOnce).to.equal(true);
            expect(kwalitoSDK.userDietUpdate.args[0]).to.have.length(1);
            expect(kwalitoSDK.userDietUpdate.args[0][0])
              .to.deep.equal({[dietId]: {options: {id: optionId}, selected: false}});
          });
      });

      it('should dispatch the \'updateState\' action', () => {
        const dietId = 42;
        const optionId = 24;
        const user = getLoggedInUser({
          diets: {[dietId]: {selected: false}}
        });
        const kwalitoSDK = getKwalitoSDK(undefined, user);
        kwalitoSDK.userGet = sinon.stub().resolves(user);
        const action = {
          id: dietId,
          options: {id: optionId}
        };
        const store = getStore();
        return middlewareActions[actionTypes.DIET_SET_OPTIONS](kwalitoSDK, action, store)
          .then(() => {
            expect(store.dispatch.calledOnce).to.equal(true);
            expect(store.dispatch.args[0]).to.have.length(1);
            expect(store.dispatch.args[0][0]).to.deep.equal(actions.updateState({user}));
          });
      });
    });
  });
  describe('Action dispatcher', () => {
    it('should call \'next\' for unknown actions', () => {
      const kwalitoSDK = getKwalitoSDK();
      const action = {type: 'unknown action type'};
      const store = getStore();
      const history = getHistory();
      const next = getNext();
      return Promise.resolve(kwalitoMiddleware(kwalitoSDK, history)(store)(next)(_.cloneDeep(action)))
        .then(() => {
          expect(next.calledOnce).to.equal(true);
          expect(next.args[0]).to.have.length(1);
          expect(next.args[0][0]).to.deep.equal(action);
        });
    });

    it('should catch errors and populate the action with it', () => {
      const kwalitoSDK = getKwalitoSDK();
      const action = {type: actionTypes.USER_SIGNIN};
      const store = getStore();
      const history = getHistory();
      const next = getNext();
      return Promise.resolve(kwalitoMiddleware(kwalitoSDK, history)(store)(next)(action))
        .then(() => {
          expect(action.error).to.be.an.instanceOf(Error);
          expect(next.calledOnce).to.equal(true);
          expect(next.args[0]).to.have.length(1);
          expect(next.args[0][0]).to.deep.equal(action);
        });
    });

    it('should send user to the specified page', () => {
      const kwalitoSDK = getKwalitoSDK();
      const action = {type: actionTypes.USER_SIGNOUT, next: '/next/page'};
      const store = getStore();
      const history = getHistory();
      const next = getNext();
      return Promise.resolve(kwalitoMiddleware(kwalitoSDK, history)(store)(next)(action))
        .then(() => {
          expect(history.replace.calledOnce).to.equal(true);
          expect(history.replace.args[0]).to.have.length(1);
          expect(history.replace.args[0][0]).to.deep.equal(action.next);
          expect(next.calledOnce).to.equal(true);
          expect(next.args[0]).to.have.length(1);
          expect(next.args[0][0]).to.deep.equal(action);
        });
    });
  });
});
