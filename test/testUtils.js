import React from 'react';
import { shallow } from 'enzyme';

export const componentWrapper = (Component, defaultArgs) => (args) => {
  const finalArgs = {
    ...defaultArgs,
    ...args
  };
  const topWrapper = shallow(<Component {...finalArgs} />);
  return {finalArgs, topWrapper};
};
