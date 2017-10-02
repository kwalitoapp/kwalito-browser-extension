import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../app/components/Header';

describe('Components: Header', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('h1')).to.have.length(1);
    const h1 = wrapper.find('h1').at(0);
    expect(h1.text()).to.equal('Kwalito');
  });
});
