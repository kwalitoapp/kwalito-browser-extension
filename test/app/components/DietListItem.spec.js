import { shallow, render } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { ListItem } from 'react-toolbox/lib/list';
import DietListItem from '../../../app/components/DietListItem';
import style from '../../../app/components/DietListItem.css';
import * as routes from '../../../app/utils/routes';

describe('Components: DietListItem', () => {
  it('should render one react-toolbox <ListItem /> component', () => {
    const wrapper = shallow(<DietListItem diet={{}} actions={{}} />);
    expect(wrapper.find(ListItem)).to.have.length(1);
  });

  it('should add a `diet-${id}` class', () => {
    const diet = { id: 42 };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    expect(wrapper.find(ListItem).hasClass(`diet-${diet.id}`)).to.equal(true);
  });

  it('should not add a `selected` class if the diet if not selected', () => {
    const diet = { id: 42 };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    expect(wrapper.find(ListItem).hasClass(style.selected)).to.equal(false);
  });

  it('should add a `selected` class if the diet if selected', () => {
    const diet = { id: 42, selected: true };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    expect(wrapper.find(ListItem).hasClass(style.selected)).to.equal(true);
  });

  it('should set the left icon', () => {
    const diet = { id: 42, pictureSvg: '<svg><path/></svg>' };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    expect(wrapper.find(ListItem).prop('leftIcon').props.dangerouslySetInnerHTML.__html)
      .to.contain(diet.pictureSvg);
  });

  it('should set the left icon 2', () => {
    const diet = { id: 42, pictureSvg: '<svg><path/></svg>' };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    const leftIconWrapper = render(wrapper.find(ListItem).prop('leftIcon'));
    expect(leftIconWrapper.html()).to.contain(diet.pictureSvg);
  });

  it('should display the diet name', () => {
    const diet = { id: 42, name: 'Some diet' };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    const itemContentWrapper = shallow(wrapper.find(ListItem).prop('itemContent'));
    expect(itemContentWrapper.text()).to.contain(diet.name);
  });

  it('should add a checkbox', () => {
    const diet = { id: 42, selected: false };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    const rightActionsWrapper = shallow(wrapper.find(ListItem).prop('rightActions')[0]);
    expect(rightActionsWrapper.text()).to.contain('check_box');
  });

  it('should render the "more info" link', () => {
    const diet = { id: 42, selected: false, description: 'very healthy diet' };
    const actions = { rightSideBar: { display: sinon.spy() }};
    const wrapper = shallow(<DietListItem diet={diet} actions={actions} />);
    const rightActionsWrapper = wrapper.find(ListItem).prop('rightActions')[1];
    rightActionsWrapper.props.onClick();
    expect(actions.rightSideBar.display.calledOnce).to.equal(true);
    expect(actions.rightSideBar.display.calledWith(diet.description)).to.equal(true);
    expect(rightActionsWrapper.props.children).to.equal('info_outline');
  });
});
