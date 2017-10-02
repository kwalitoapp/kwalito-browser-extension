import { expect } from 'chai';
import _ from 'lodash';
import reducers from '../../../app/reducers';

const reducerNames = ['kwalito', 'auth', 'router'];

describe('Reducers: Index', () => {
  it(`should create ${reducerNames.length} reducers`, () => {
    const myReducers = reducers(undefined, {});
    expect(_.keys(myReducers)).to.have.length(reducerNames.length);
  });
  reducerNames.forEach((reducerName) => (
    it(`should create reducer "${reducerName}"`, () => {
      const myReducers = reducers(undefined, {});
      expect(typeof myReducers[reducerName]).to.exist;
    })
  ));
});
