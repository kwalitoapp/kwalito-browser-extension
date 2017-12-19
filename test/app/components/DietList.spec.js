import { shallow, render } from 'enzyme';
import React from 'react';
import chai from 'chai';
import sinon from 'sinon';
import { List, ListSubHeader } from 'react-toolbox/lib/list';
import DietList from '../../../app/components/DietList';
import DietListItem from '../../../app/components/DietListItem';

const expect = chai.expect;

describe('Components: DietList', () => {
  it('should render 3 react-toolbox <List /> component', () => {
    const wrapper = shallow(<DietList diets={[]} actions={{}} userDiets={{}} userIngredients={[]} />);
    expect(wrapper.find(List)).to.have.length(3);
    expect(wrapper.find(List).children()).to.have.length(2);
  });

  it('should set specific diet style', () => {
    const diet = { id: 42, color: '#123456' };
    const userDiet = {selected: false, options:{}};
    const wrapper = shallow(<DietList diets={[diet]} actions={{}} userDiets={{[diet.id]: userDiet}} userIngredients={[]} />);
    const styleWrapper = render(wrapper.find('#diets').find(List).childAt(0).getNode());
    expect(styleWrapper.html()).to.contain(`.diet-${diet.id}`);
    expect(styleWrapper.html()).to.contain(diet.color);
  });

  it('should contain a subHeader', () => {
    const diet = { id: 42, color: '#123456' };
    const userDiet = {selected: false, options:{}};
    const wrapper = shallow(<DietList diets={[diet]} actions={{}} userDiets={{[diet.id]: userDiet}} userIngredients={[]} />);
    expect(wrapper.find(ListSubHeader)).to.have.length(1);
  });

  it('should render as many DietListItems as diets', () => {
    const diets = [
      { id: 42, color: '#123456' },
      { id: 24, color: '#987654' }
    ];
    const userDiets = {
      [diets[0].id]: {selected: false, options:{}},
      [diets[1].id]: {selected: true, options:{}}
    };
    const actions = {};
    const wrapper = shallow(<DietList diets={diets} actions={actions} userDiets={userDiets} userIngredients={[]} />);
    expect(wrapper.find(DietListItem)).to.have.length(diets.length);
    expect(wrapper.find(DietListItem).at(0).prop('diet')).to.equal(diets[0]);
    expect(wrapper.find(DietListItem).at(0).prop('actions')).to.equal(actions);
    expect(wrapper.find(DietListItem).at(1).prop('diet')).to.equal(diets[1]);
    expect(wrapper.find(DietListItem).at(1).prop('actions')).to.equal(actions);
  });
});
