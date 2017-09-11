import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router'

import Header from '../components/Header';
import MainSection from '../components/MainSection';
import MoreInfoSection from '../components/MoreInfoSection';
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
    kwalito: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { kwalito, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addTodo={actions.addTodo} />
        <div>
          <Route exact path="/" render={() => (
            <MainSection kwalito={kwalito} actions={actions} />
          )}/>
          <Route path="/moreInfo/:id" render={({match}) => (
            <MoreInfoSection diet={kwalito.find((diet) => (diet.id == match.params.id))}/>
          )}/>
        </div>
      </div>
    );
  }
}
