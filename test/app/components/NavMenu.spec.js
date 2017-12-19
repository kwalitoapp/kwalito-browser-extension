import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import * as testUtils from '../../testUtils';
import NavMenu, {clickHandler} from '../../../app/components/NavMenu';
import * as routes from '../../../app/utils/routes';

describe('Components: NavMenu', () => {
  const getUser = (args) => ({
    anonymous: true,
    firstName: undefined,
    lastName: undefined,
    pictureUrl: undefined,
    ...args
  });
  const getNavMenuArgs = () => ({
    actions: {
      leftMenu: {
        toggle: sinon.spy()
      }
    },
    history: {
      push: sinon.spy()
    },
    user: getUser()
  });
  const wrapComponent = (args) => {
    const wrappedComponent = testUtils.componentWrapper(NavMenu, {...getNavMenuArgs(), ...args});
    return wrappedComponent(args);
  };

  it('should render', () => {
    const {topWrapper} = wrapComponent();
    expect(topWrapper).to.have.length(1);
  });

  it('should render all children', () => {
    const {topWrapper} = wrapComponent();
    expect(topWrapper.children()).to.have.length(6);
  });

  describe('clickHandler', () => {
    it('should toggle the left menu', () => {
      const args = getNavMenuArgs();
      const handler = clickHandler(args.actions, args.history, '');
      handler();
      expect(args.actions.leftMenu.toggle.calledOnce).to.equal(true);
    });
    it('should push the given route in history', () => {
      const args = getNavMenuArgs();
      const myRoute = '/superRoute';
      const handler = clickHandler(args.actions, args.history, myRoute);
      handler();
      expect(args.history.push.calledOnce).to.equal(true);
      expect(args.history.push.calledWith(myRoute)).to.equal(true);
    });
  });

  it('should render an anonymous user', () => {
    const {topWrapper, finalArgs} = wrapComponent();
    const menuHeader = topWrapper.childAt(0);
    expect(menuHeader.prop('caption')).to.equal('Anonyme');
    const rightIconWrapper = shallow(menuHeader.prop('rightIcon'));
    expect(rightIconWrapper.prop('image')).to.equal(null);
    menuHeader.simulate('click');
    expect(finalArgs.actions.leftMenu.toggle.calledOnce).to.equal(true);
    expect(finalArgs.history.push.calledOnce).to.equal(true);
    expect(finalArgs.history.push.calledWith(routes.sign())).to.equal(true);
  });

  it('should render an authenticated user', () => {
    const user = getUser({
      anonymous: false,
      firstName: 'Fiona',
      lastName: 'Princess',
      pictureUrl: 'https://www.quizz.biz/uploads/quizz/125454/7_Q2Ebp.jpg',
    });
    const {topWrapper, finalArgs} = wrapComponent({user});
    const menuHeader = topWrapper.childAt(0);
    expect(menuHeader.prop('caption')).to.equal(`${user.firstName} ${user.lastName}`);
    const rightIconWrapper = shallow(menuHeader.prop('rightIcon'));
    expect(rightIconWrapper.prop('image')).to.equal(user.pictureUrl);
    menuHeader.simulate('click');
    expect(finalArgs.actions.leftMenu.toggle.calledOnce).to.equal(true);
    expect(finalArgs.history.push.calledOnce).to.equal(true);
    expect(finalArgs.history.push.calledWith(routes.profile())).to.equal(true);
  });
});
