import test from 'ava';
import { shallow } from 'enzyme';

import { ListItem } from 'react-toolbox/lib/list';
import DietListItem from '../../../app/components/DietListItem';

test('should render one react-toolbox <ListItem /> component', (t) => {
  const wrapper = shallow(<DietListItem />);
  t(wrapper.find(ListItem).length, 3);
});

// test('should render an `.icon-star`', (t) => {
//   const wrapper = shallow(<MyComponent />);
//   expect(wrapper.find('.icon-star')).to.have.length(1);
// });
//
// test('should render children when passed in', (t) => {
//   const wrapper = shallow((
//     <MyComponent>
//       <div className="unique" />
//     </MyComponent>
//   ));
//   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
// });
//
// test('simulates click events', (t) => {
//   const onButtonClick = sinon.spy();
//   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
//   wrapper.find('button').simulate('click');
//   expect(onButtonClick.calledOnce).to.equal(true);
// });
