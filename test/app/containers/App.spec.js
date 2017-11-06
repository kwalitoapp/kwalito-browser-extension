import { shallow, render } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Route } from 'react-router-dom'
import App from '../../../app/containers/App';
import * as routes from '../../../app/utils/routes';
import NavMenu from '../../../app/components/NavMenu';

describe('Container: App', () => {
  const setup = () => {
    const history = {replace: sinon.spy()};
    const router  = {};
    const actions = {};
    const kwalito = { diets: [] };
    const rightSideBar = {};
    const leftMenu = {};
    const store = {
      getState: () => ({ history, actions, kwalito, rightSideBar, leftMenu }),
      subscribe: () => {},
      dispatch: () => {}
    };
    const topWrapper = shallow(<App store={store} history={history}/>);
    const appWrapper = shallow(topWrapper.at(0).getNode());
    return { store, history, actions, kwalito, rightSideBar, leftMenu, topWrapper, appWrapper };
  };

  it('should declare root routes', () => {
    const { appWrapper } = setup();
    const declaredRoutes = appWrapper.find(Route);
    expect(declaredRoutes).to.have.length(3);
    expect(declaredRoutes.at(0).prop('path')).to.equal(routes.home());
    expect(declaredRoutes.at(1).prop('path')).to.equal(routes.sign());
    expect(declaredRoutes.at(2).prop('path')).to.equal(routes.diets());
  });

  it('should declare the navigation menu', () => {
    const { appWrapper } = setup();
    const declaredRoutes = appWrapper.find(NavMenu);
    expect(declaredRoutes).to.have.length(1);
  });
});
