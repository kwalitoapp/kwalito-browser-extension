import chai from 'chai';

import * as types from '../../app/constants/ActionTypes';
import * as kwalito from '../../app/actions/kwalito';
import * as leftMenu from '../../app/actions/leftMenu';
import * as rightSideBar from '../../app/actions/rightSideBar';

const expect = chai.expect;

describe('Actions', () => {
    describe('diets', () => {
        it('select should create DIET_TOGGLE_SELECT action', () => {
            const id = 42;
            expect(kwalito.toggleSelect(id)).to.deep.equal({ type: types.DIET_TOGGLE_SELECT, id });
        });
    });
    describe('leftMenu', () => {
        it('select should create LEFT_MENU_TOGGLE action', () => {
            expect(leftMenu.toggle()).to.deep.equal({ type: types.LEFT_MENU_TOGGLE });
        });
    });
    describe('rightSideBar', () => {
        it('select should create RIGHT_SIDE_BAR_DISPLAY action', () => {
            const content = 'some content';
            expect(rightSideBar.display(content)).to.deep.equal({ type: types.RIGHT_SIDE_BAR_DISPLAY, content });
        });
        it('select should create LEFT_MENU_TOGGLE action', () => {
            expect(rightSideBar.toggle()).to.deep.equal({ type: types.RIGHT_SIDE_BAR_TOGGLE });
        });
    });
});
