import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EmailSignUpForm } from 'redux-auth/material-ui-theme';

export default class DietList extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { actions } = this.props;

    return (
      <EmailSignUpForm />
    );
  }
}
