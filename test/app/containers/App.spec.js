import { shallow, render } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Route } from 'react-router-dom'
import App from '../../../app/containers/App';
import * as routes from '../../../app/utils/routes';

describe('Container: App', () => {
  const setup = (authReturnValue = false) => {
    const auth    = {getIn: sinon.spy(() => authReturnValue)};
    const history = {replace: sinon.spy()};
    const router  = {};
    const kwalito = [];
    const store   = {getState: () => ({auth, history, router, kwalito})};
    const topWrapper = shallow(<App store={store} history={history}/>);
    const appWrapper = shallow(topWrapper.at(0).getNode()); // avoid enclosing <Connect> component
    return { auth, history, router, kwalito, store, topWrapper, appWrapper };
  };

  it('should redirect user to the signing screen if not authenticated', () => {
    const { history } = setup();
    expect(history.replace.calledOnce).to.be.true;
    expect(history.replace.getCall(0).args).to.deep.equal([routes.sign()]);
  });

  it('should redirect user to the diets screen if authenticated', () => {
    const { history } = setup(true);
    expect(history.replace.calledOnce).to.be.true;
    expect(history.replace.getCall(0).args).to.deep.equal([routes.diets()]);
  });

  it('should declare root routes', () => {
    const { appWrapper } = setup();
    const declaredRoutes = appWrapper.find(Route);
    expect(declaredRoutes).to.have.length(3);
    expect(declaredRoutes.at(0).prop('path')).to.equal(routes.sign());
  });
});
