import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { AuthGlobals } from "redux-auth/material-ui-theme";

import * as routes from '../utils/routes';
import Header from '../components/Header';
import DietList from '../components/DietList';
import MoreInfoSection from '../components/MoreInfoSection';
import Sign from '../components/Sign';
import * as DietActions from '../actions/diets';
import style from './App.css';

@connect(
  state => ({
    kwalito: state.kwalito
  }),
  dispatch => ({
    actions: bindActionCreators(DietActions, dispatch)
  })
)


export default class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    kwalito: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  requireAuth(store, nextState, replace, next) {
    if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
      replace(routes.sign());
    }
    next();
  }

  initialRouting() {
    const { store, history } = this.props;
    if(!history.location || history.location === '/'){
      const destination = store.getState().auth.getIn(['user', 'isSignedIn']) ? routes.diets() : routes.sign();
      history.replace(destination);
    }
  }

  render() {
    this.initialRouting();
    const { store, history, kwalito, actions } = this.props;
    return (
      <Provider store={store}>
        <div>
          <AuthGlobals />
          <Router history={history}>
            <div className={style.normal}>
              <Header />
              <section>
                <Route exact path={routes.sign()} component={Sign} />
                <Route exact path={routes.diets()} onEnter={this.requireAuth} render={() => (
                  <DietList kwalito={kwalito} actions={actions} />
                )}/>
                <Route exact path={routes.dietInfo()} onEnter={this.requireAuth} render={({match}) => (
                  <MoreInfoSection diet={kwalito.find((diet) => (diet.id == match.params.id))}/>
                )}/>
              </section>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}
