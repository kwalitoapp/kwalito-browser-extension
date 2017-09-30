import { shallow, render } from 'enzyme';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { List, ListSubHeader } from 'react-toolbox/lib/list';
import DietList from '../../../app/components/DietList';
import DietListItem from '../../../app/components/DietListItem';

const expect = chai.expect;

describe('Components: DietList', () => {
  it('should render one react-toolbox <List /> component', () => {
    const wrapper = shallow(<DietList kwalito={[]} actions={{}} />);
    expect(wrapper.find(List)).to.have.length(1);
    expect(wrapper.find(List).children()).to.have.length(2);
  });

  it('should set specific diet style', () => {
    const diet = { id: 42, color: '#123456', selected: false };
    const wrapper = shallow(<DietList kwalito={[diet]} actions={{}} />);
    const styleWrapper = render(wrapper.find(List).childAt(0).getNode());
    expect(styleWrapper.html()).to.contain(`.diet-${diet.id}`);
    expect(styleWrapper.html()).to.contain(diet.color);
  });

  it('should contain a subHeader', () => {
    const diet = { id: 42, color: '#123456', selected: false };
    const wrapper = shallow(<DietList kwalito={[diet]} actions={{}} />);
    expect(wrapper.find(ListSubHeader)).to.have.length(1);
  });

  it('should render as many DietListItems as diets', () => {
    const diets = [
      { id: 42, color: '#123456', selected: false },
      { id: 24, color: '#987654', selected: true }
    ];
    const actions = {};
    const wrapper = shallow(<DietList kwalito={diets} actions={actions} />);
    expect(wrapper.find(DietListItem)).to.have.length(diets.length);
    expect(wrapper.find(DietListItem).at(0).prop('diet')).to.equal(diets[0]);
    expect(wrapper.find(DietListItem).at(0).prop('actions')).to.equal(actions);
    expect(wrapper.find(DietListItem).at(1).prop('diet')).to.equal(diets[1]);
    expect(wrapper.find(DietListItem).at(1).prop('actions')).to.equal(actions);
  });
});
