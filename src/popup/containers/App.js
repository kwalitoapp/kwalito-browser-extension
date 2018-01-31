import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import { Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as routes from '../utils/routes';
import DietList from '../components/DietList';
import Sign from '../components/Sign';
import NavMenu from '../components/NavMenu';
import * as KwalitoActions from '../actions/kwalito';
import * as LeftMenuActions from '../actions/leftMenu';
import * as RightSideBarActions from '../actions/rightSideBar';
import theme from '../../theme';
import style from './App.css';


@connect(state => ({
  kwalito: state.kwalito,
  leftMenu: state.leftMenu,
  rightSideBar: state.rightSideBar
}), dispatch => ({
  actions: {
    kwalito: bindActionCreators(KwalitoActions, dispatch),
    leftMenu: bindActionCreators(LeftMenuActions, dispatch),
    rightSideBar: bindActionCreators(RightSideBarActions, dispatch)
  }
}))
export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const {
            store, history, actions, kwalito, rightSideBar, leftMenu
          } = this.props;

    return (
      <Provider store={store}>
        <Router history={history}>
          <MuiThemeProvider muiTheme={theme}>
            <div>
              <Drawer
                open={leftMenu.active}
                docked={false}
                onRequestChange={(open) => {
                  if (!open) {
                    actions.leftMenu.toggle();
                  }
                }}
              >
                <NavMenu actions={actions} history={history} user={kwalito.user} />
              </Drawer>
              <Drawer
                open={rightSideBar.active}
                width={300}
                openSecondary
                docked={false}
                onRequestChange={(open) => {
                  if (!open) {
                    actions.rightSideBar.toggle();
                  }
                }}
              >
                <div className={style.rightSideBarContent}>
                  <div
                    className={style.rightSideBarContent}
                    dangerouslySetInnerHTML={{ __html: rightSideBar.content }}
                  />
                </div>
              </Drawer>
              <AppBar onLeftIconButtonClick={actions.leftMenu.toggle} title="Kwalito" />
              <Route
                exact
                path={routes.home()}
                render={() => (
                  <div>
                    <p>Kwalito home</p>
                  </div>
                )}
              />
              <Route
                exact
                path={routes.sign()}
                render={() => (
                  <Sign
                    actions={actions}
                    signError={kwalito.errors.sign}
                  />
                )}
              />
              <Route
                exact
                path={routes.diets()}
                render={() => (
                  <DietList
                    language={kwalito.user.language}
                    diets={kwalito.diets}
                    userDiets={kwalito.user.diets}
                    userIngredients={kwalito.user.ingredients}
                    ingredientSearchResult={kwalito.ingredientSearchResult}
                    actions={actions}
                  />
                )}
              />
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}
