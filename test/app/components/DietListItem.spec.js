import { shallow } from 'enzyme';
import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { ListItem } from 'react-toolbox/lib/list';
import * as testUtils from '../../testUtils';
import DietListItem from '../../../app/components/DietListItem';
import style from '../../../app/components/DietListItem.css';

describe('Components: DietListItem', () => {
  const wrappedComponent = testUtils.componentWrapper(DietListItem, {
    diet: {options: {}},
    actions:{},
    userDiet: {}
  });
  const wrapComponent = (args) => {
    const {finalArgs, topWrapper} = wrappedComponent(args);
    const listItemWrapper = topWrapper.find(ListItem);
    const optionWrapper = topWrapper.find(`.${style.option}`);
    return {finalArgs, topWrapper, listItemWrapper, optionWrapper};
  };

  it('should render one react-toolbox <ListItem /> component', () => {
    const {listItemWrapper} = wrapComponent();
    expect(listItemWrapper).to.have.length(1);
  });

  it('should add a `diet-${id}` class', () => {
    const diet = { id: 42, options: {} };
    const {topWrapper} = wrapComponent({diet});
    expect(topWrapper.hasClass(`diet-${diet.id}`)).to.equal(true);
  });

  it('should not add a `selected` class if the diet if not selected', () => {
    const diet = { id: 42, options: {} };
    const {topWrapper} = wrapComponent({diet});
    expect(topWrapper.hasClass(style.selected)).to.equal(false);
  });

  it('should add a `selected` class if the diet if selected', () => {
    const diet = { id: 42, options: {} };
    const userDiet = {selected: true};
    const {topWrapper} = wrapComponent({diet, userDiet});
    expect(topWrapper.hasClass(style.selected)).to.equal(true);
  });

  it('should set the left icon', () => {
    const diet = { id: 42, options: {}, pictureSvg: '<svg><path/></svg>' };
    const {listItemWrapper} = wrapComponent({diet});
    expect(listItemWrapper.prop('leftIcon').props.dangerouslySetInnerHTML.__html)
      .to.contain(diet.pictureSvg);
  });

  it('should display the diet name', () => {
    const diet = { id: 42, options: {}, name: 'Some diet' };
    const {listItemWrapper} = wrapComponent({diet});
    const itemContentWrapper = shallow(listItemWrapper.prop('itemContent'));
    expect(itemContentWrapper.text()).to.contain(diet.name);
  });

  it('should add a checkbox', () => {
    const diet = { id: 42, options: {} };
    const userDiet = {selected: false};
    const {listItemWrapper} = wrapComponent({diet, userDiet});
    const rightActionsWrapper = shallow(listItemWrapper.prop('rightActions')[0]);
    expect(rightActionsWrapper.text()).to.contain('check_box');
  });

  it('should render the "more info" link', () => {
    const diet = { id: 42, options: {}, description: 'very healthy diet' };
    const userDiet = {selected: false};
    const actions = { rightSideBar: { display: sinon.spy() }};
    const {listItemWrapper} = wrapComponent({diet, actions, userDiet});
    const rightActionsWrapper = listItemWrapper.prop('rightActions')[1];
    rightActionsWrapper.props.onClick();
    expect(actions.rightSideBar.display.calledOnce).to.equal(true);
    expect(actions.rightSideBar.display.calledWith(diet.description)).to.equal(true);
    expect(rightActionsWrapper.props.children).to.equal('info_outline');
  });

  it('should not render any option if the diet is not selected', () => {
    const diet = {
      id: 42,
      options: {
        type: 'slide',
        default: {id: 2},
        options: [
          {id: 1, name: 'first option'},
          {id: 2, name: 'second option'}
        ]
      },
      description: 'very healthy diet'
    };
    const userDiet = {selected: false, options: {}};
    const actions = { rightSideBar: { display: sinon.spy() }};
    const {optionWrapper} = wrapComponent({diet, actions, userDiet});
    expect(optionWrapper.length).to.equal(0);
  });

  it('should render the slider option', () => {
    const diet = {
      id: 42,
      options: {
        type: 'slide',
        default: {id: 2},
        options: [
          {id: 1, name: 'first option'},
          {id: 2, name: 'second option'}
        ]
      },
      description: 'very healthy diet'
    };
    const userDiet = {selected: true, options: {}};
    const actions = { rightSideBar: { display: sinon.spy() }};
    const {optionWrapper} = wrapComponent({diet, actions, userDiet});
    expect(optionWrapper.length).to.equal(1);
  });
});
