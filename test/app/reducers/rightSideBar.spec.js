import chai from 'chai';

import * as types from '../../../app/constants/ActionTypes';
import rightSideBar from '../../../app/reducers/rightSideBar';

const expect = chai.expect;

describe('Reducers: Right SideBar', () => {
    it('should handle empty initial state', () => {
        const state = rightSideBar(undefined, {});
        expect(state.active).to.deep.equal(false);
        expect(state).to.have.own.property('content');
        expect(state.content).to.equal(undefined);
    });

    it('should handle RIGHT_SIDE_BAR_TOGGLE', () => {
        const stateSelected = rightSideBar(undefined, { type: types.RIGHT_SIDE_BAR_TOGGLE });
        expect(stateSelected.active).to.equal(true);

        const stateDeselected = rightSideBar(stateSelected, { type: types.RIGHT_SIDE_BAR_TOGGLE });
        expect(stateDeselected.active).to.equal(false);
    });

    it('should handle RIGHT_SIDE_BAR_DISPLAY', () => {
        const content = '<p>very important</p>';
        let state = rightSideBar(undefined, { type: types.RIGHT_SIDE_BAR_DISPLAY, content });
        expect(state.active).to.equal(true);
        expect(state.content).to.equal(content);

        const anotherContent = '<p>less important</p>';
        state = rightSideBar(undefined, { type: types.RIGHT_SIDE_BAR_DISPLAY, content: anotherContent });
        expect(state.active).to.equal(true);
        expect(state.content).to.equal(anotherContent);
    });
});
