import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoTextInput from './TodoTextInput';

export default class Header extends Component {

  static propTypes = {
  };

  render() {
    return (
      <header>
        <h1>Kwalito</h1>
      </header>
    );
  }
}
