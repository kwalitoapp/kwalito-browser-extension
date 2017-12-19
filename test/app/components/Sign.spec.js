import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Tab } from 'react-toolbox/lib/tabs';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import SnackBar from 'react-toolbox/lib/snackbar';
import * as testUtils from '../../testUtils';
import Sign from '../../../app/components/Sign';
import * as routes from '../../../app/utils/routes';

describe('Components: Sign', () => {
  const wrapComponent = (args) => {
    const wrappedComponent = testUtils.componentWrapper(Sign, {
      actions: {
        kwalito: {
          signIn: sinon.spy(),
          signUp: sinon.spy()
        }
      }
    });
    const {finalArgs, topWrapper} = wrappedComponent(args);
    const tabs = topWrapper.find(Tab);
    const signInTab = tabs.find('#signIn');
    const signUpTab = tabs.find('#signUp');
    const snackBar = topWrapper.find(SnackBar);
    return {finalArgs, topWrapper, signInTab, signUpTab, snackBar};
  };

  it('should render', () => {
    const {topWrapper, signInTab, signUpTab, snackBar} = wrapComponent();
    expect(topWrapper).to.have.length(1);
    expect(signInTab).to.have.length(1);
    expect(signUpTab).to.have.length(1);
    expect(snackBar).to.have.length(1);
  });

  it('should trigger the signIn action', () => {
    const email = 'carrot@good-food.org';
    const password = 'eatMe!';
    const {finalArgs, signInTab} = wrapComponent();
    signInTab.find(Input).find('[name="email"]').simulate('change', email);
    signInTab.find(Input).find('[name="password"]').simulate('change', password);
    signInTab.find(Button).simulate('mouseUp');

    expect(finalArgs.actions.kwalito.signIn.calledOnce).to.equal(true);
    expect(finalArgs.actions.kwalito.signIn.calledWith({
      login: email,
      password,
      next: routes.diets()
    })).to.equal(true);
    expect(finalArgs.actions.kwalito.signUp.callCount).to.equal(0);
  });

  it('should trigger the signUp action', () => {
    const email = 'carrot@good-food.org';
    const password = 'eatMe!';
    const firstName = 'Orange!';
    const lastName = 'Tasty';
    const {finalArgs, signUpTab} = wrapComponent();
    signUpTab.find(Input).find('[name="email"]').simulate('change', email);
    signUpTab.find(Input).find('[name="password"]').simulate('change', password);
    signUpTab.find(Input).find('[name="firstName"]').simulate('change', firstName);
    signUpTab.find(Input).find('[name="lastName"]').simulate('change', lastName);
    signUpTab.find(Button).simulate('mouseUp');

    expect(finalArgs.actions.kwalito.signUp.calledOnce).to.equal(true);
    expect(finalArgs.actions.kwalito.signUp.calledWith({
      login: email,
      password,
      userInfo: {
        firstName,
        lastName,
        email
      },
      next: routes.diets()
    })).to.equal(true);
    expect(finalArgs.actions.kwalito.signIn.callCount).to.equal(0);
  });

  it('should display the snack bar if there\'s an error', () => {
    const message = 'Oooooops!';
    const {snackBar} = wrapComponent({signError: {message}});

    expect(snackBar.prop('active')).to.equal(true);
    expect(snackBar.prop('label')).to.equal(message);
  });
});
