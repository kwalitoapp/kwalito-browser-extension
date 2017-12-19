import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import SnackBar from 'react-toolbox/lib/snackbar';
import * as routes from '../utils/routes';

export default class Sign extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    snackBarActive: true
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    signError: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

  handleChange(name, value) {
    this.setState({...this.state, [name]: value});
  }

  signIn() {
    const { actions } = this.props;
    actions.kwalito.signIn({
      login: this.state.email,
      password: this.state.password,
      next: routes.diets()
    });
    this.setState({ snackBarActive: true });
  }

  signUp() {
    const { actions } = this.props;
    actions.kwalito.signUp({
      login: this.state.email,
      password: this.state.password,
      userInfo: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      },
      next: routes.diets()
    });
    this.setState({ snackBarActive: true });
  }

  hideSnackBar() {
    this.setState({ snackBarActive: false });
  }

  render() {
    const {signError} = this.props;
    const {snackBarActive} = this.state;
    return (
      <div>
        <Tabs index={this.state.index} onChange={(index) => { this.setState({ index }); }} fixed>
          <Tab label='Sign in' id="signIn">
            <Input type='email' label='Adresse e-mail' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} maxLength={255} />
            <Input type='password' label='Mot de passe' name='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} minLength={6} maxLength={64} />
            <Button label='Sign in' onMouseUp={this.signIn.bind(this)} raised primary />
          </Tab>
          <Tab label='Sign up' id="signUp">
            <Input type='text' label='Prénom' name='firstName' value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')} maxLength={255} />
            <Input type='text' label='Nom' name='lastName' value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')} maxLength={255} />
            <Input type='email' label='Adresse e-mail' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} maxLength={255} />
            <Input type='password' label='Mot de passe' name='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} minLength={6} maxLength={64} />
            <Button label='Sign up' onMouseUp={this.signUp.bind(this)} raised primary />
          </Tab>
        </Tabs>
        <SnackBar
          active={snackBarActive && !!signError}
          label={signError ? signError.message : ''}
          timeout={4000}
          onTimeout={this.hideSnackBar.bind(this)}
          type="warning"
        />
      </div>
    );
  }
}
