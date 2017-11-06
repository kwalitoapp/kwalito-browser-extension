import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { List, ListSubHeader } from 'react-toolbox/lib/list';
import { ListItem } from 'react-toolbox/lib/list';
import { Link } from 'react-router-dom'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout';
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Checkbox } from 'react-toolbox/lib/checkbox';
import { IconButton } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import * as routes from '../utils/routes';
import Header from '../components/Header';
import DietList from '../components/DietList';
import MoreInfoSection from '../components/MoreInfoSection';
import Sign from '../components/Sign';
import NavMenu from '../components/NavMenu';
import * as KwalitoActions from '../actions/kwalito';
import * as LeftMenuActions from '../actions/leftMenu';
import * as RightSideBarActions from '../actions/rightSideBar';
import style from './App.css';


@connect(
    (state) => ({
        kwalito: state.kwalito,
        leftMenu: state.leftMenu,
        rightSideBar: state.rightSideBar
    }), (dispatch) => ({
        actions: {
            kwalito: bindActionCreators(KwalitoActions, dispatch),
            leftMenu: bindActionCreators(LeftMenuActions, dispatch),
            rightSideBar: bindActionCreators(RightSideBarActions, dispatch)
        }
    })
)
export default class App extends Component {

    static propTypes = {
        store:          PropTypes.object.isRequired,
        history:        PropTypes.object.isRequired,
        actions:        PropTypes.object.isRequired
    };

    render() {
        const { store, history, actions, kwalito, rightSideBar, leftMenu } = this.props;
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Layout>
                        <NavDrawer active={leftMenu.active}
                                   permanentAt='xxxl'
                                   onOverlayClick={actions.leftMenu.toggle}>
                            <NavMenu actions={actions} history={history} />
                        </NavDrawer>
                        <Panel>
                            <AppBar leftIcon='menu' onLeftIconClick={actions.leftMenu.toggle} />
                            <Route exact path={routes.home()} render={() => (
                                <div>
                                    <p>Kwalito home</p>
                                </div>
                            )} />
                            <Route exact path={routes.sign()} render={() => (
                                <Sign actions={actions} />
                            )} />
                            <Route exact path={routes.diets()} render={() => (
                                <DietList diets={kwalito.diets} actions={actions}  />
                            )} />
                        </Panel>
                        <Sidebar pinned={ rightSideBar.active } width={ 5 }>
                            <div><IconButton icon='close' onClick={ actions.rightSideBar.toggle }/></div>
                            <div
                                dangerouslySetInnerHTML={{__html: rightSideBar.content}}
                            />
                        </Sidebar>
                    </Layout>
                </Router>
            </Provider>
        );
    }
}
