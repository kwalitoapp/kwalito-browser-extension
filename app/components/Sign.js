import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import FontIcon from 'react-toolbox/lib/font_icon';
import * as routes from '../utils/routes';

export default class Sign extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  static propTypes = {
    actions: PropTypes.object.isRequired
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
  }

  signUp() {
    const { actions } = this.props;
    actions.kwalito.signUp({
      login: this.state.email,
      password: this.state.password,
      next: routes.diets()
    });
  }

  render() {
    return (
      <div>
        <Tabs index={this.state.index} onChange={(index) => { this.setState({ index }); }} fixed>
          <Tab label='Sign in'>
            <Input type='email' label='Adresse e-mail' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} maxLength={255} />
            <Input type='password' label='Mot de passe' name='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} minLength={6} maxLength={64} />
            <Button label='Sign in' onMouseUp={this.signIn.bind(this)} raised primary />
          </Tab>
          <Tab label='Sign up'>
            <Input type='text' label='Prénom' name='firstName' value={this.state.firstName} onChange={this.handleChange.bind(this, 'firstName')} maxLength={255} />
            <Input type='text' label='Nom' name='lastName' value={this.state.lastName} onChange={this.handleChange.bind(this, 'lastName')} maxLength={255} />
            <Input type='email' label='Adresse e-mail' name='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} maxLength={255} />
            <Input type='password' label='Mot de passe' name='password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} minLength={6} maxLength={64} />
            <Button label='Sign up' onMouseUp={this.signUp.bind(this)} raised primary />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
