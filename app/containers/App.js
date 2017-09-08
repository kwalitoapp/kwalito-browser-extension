import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';
import style from './App.css';

@connect(
  state => ({
    kwalito: state.kwalito
  }),
  dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
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
        <MainSection kwalito={kwalito} actions={actions} />
      </div>
    );
  }
}
