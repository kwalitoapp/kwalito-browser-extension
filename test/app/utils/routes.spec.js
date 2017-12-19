import chai from 'chai';
import _ from 'lodash';
import * as routes from '../../../app/utils/routes';

const expect = chai.expect;

const routeNames = ['home', 'diets', 'sign', 'profile'];

describe('Utils: routes', () => {
  it(`should export ${routeNames.length} routes`, () => {
    expect(_.keys(routes)).to.have.length(routeNames.length);
  });
  routeNames.forEach((routeName) => (
    it(`should export route "${routeName}"`, () => {
      expect(typeof routes[routeName]).to.equal('function');
    })
  ));
});
