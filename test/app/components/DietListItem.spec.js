import { shallow, render } from 'enzyme';
import React from 'react';
import { createStore } from 'redux';
import chai from 'chai';
import sinon from 'sinon';
import { ListItem } from 'react-toolbox/lib/list';
import FontIcon from 'react-toolbox/lib/font_icon';
import DietListItem from '../../../app/components/DietListItem';
import style from '../../../app/components/DietListItem.css';
import reducers from '../../../app/reducers';

const expect = chai.expect;

describe('Components: DietListItem', () => {
  const fakeStore = createStore(reducers, {});

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

  it('should render a "more info" link', () => {
    const diet = { id: 42, selected: false };
    const wrapper = shallow(<DietListItem diet={diet} actions={{}} />);
    const rightActionsWrapper = shallow(wrapper.find(ListItem).prop('rightActions')[1], { context: { store: fakeStore } });
    expect(rightActionsWrapper.prop('to')).to.equal(`/moreInfo/${diet.id}`);
    expect(rightActionsWrapper.find(FontIcon).render().text()).to.equal('info_outline');
  });

  it('should toggle selected on click', () => {
    const diet = { id: 42, selected: false };
    const toggleSelectStub = sinon.spy();
    const wrapper = shallow(<DietListItem diet={diet} actions={{toggleSelect: toggleSelectStub}} />);
    wrapper.simulate('click');
    expect(toggleSelectStub.calledOnce).to.equal(true);
    expect(toggleSelectStub.calledWith(diet.id)).to.equal(true);
  });
});
