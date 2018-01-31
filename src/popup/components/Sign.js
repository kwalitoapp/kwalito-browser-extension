import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Tab, Tabs } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views'
import SnackBar from 'material-ui/Snackbar';
import * as routes from '../utils/routes';

export default class Sign extends Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    signError: PropTypes.object
  };

  static defaultProps = {
    signError: undefined
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      snackBarActive: true,
      index: 0
    };
  }

  @autobind
  buildChangeHandler(name, valueIndex) {
    return (...args) => {
      const value = args[valueIndex];
      this.setState({...this.state, [name]: value});
    };
  }

  @autobind
  signIn() {
    const { actions } = this.props;
    actions.kwalito.signIn({
      login: this.state.email,
      password: this.state.password,
      next: routes.diets()
    });
    this.setState({ snackBarActive: true });
  }

  @autobind
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

  @autobind
  hideSnackBar() {
    this.setState({ snackBarActive: false });
  }

  render() {
    const {signError} = this.props;
    const {snackBarActive} = this.state;
    const formFields = {
      email: <TextField
               type="email"
               hintText="Entrez votre adresse e-mail"
               floatingLabelText="Adresse e-mail"
               name="email"
               value={this.state.email}
               onChange={this.buildChangeHandler('email', 1)}
               maxLength={1024}
               fullWidth
             />,
      password: <TextField
               type="password"
               hintText="Entrez votre mot de passe"
               floatingLabelText="Mot de passe"
               name="password"
               value={this.state.password}
               onChange={this.buildChangeHandler('password', 1)}
               minLength={6}
               maxLength={64}
               fullWidth
             />,
      firstName: <TextField
               type="text"
               hintText="Prénom"
               floatingLabelText="Entrez vore prénom"
               name="firstName"
               value={this.state.firstName}
               onChange={this.buildChangeHandler('firstName', 1)}
               maxLength={1024}
               fullWidth
             />,
      lastName: <TextField
               type="text"
               hintText="Nom"
               floatingLabelText="Entrez vore nom"
               name="lastName"
               value={this.state.lastName}
               onChange={this.buildChangeHandler('lastName', 1)}
               maxLength={255}
               fullWidth
             />
    };
    return (
      <div>
        <Tabs value={this.state.index} onChange={this.buildChangeHandler('index', 0)}>
          <Tab label="Sign in" value={0} />
          <Tab label="Sign up" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.buildChangeHandler('index', 0)}
        >
          <div id="signIn">
            {formFields.email}
            {formFields.password}
            <RaisedButton label="Sign in" onClick={this.signIn} primary />
          </div>
          <div id="signUp">
            {formFields.firstName}
            {formFields.lastName}
            {formFields.email}
            {formFields.password}
            <RaisedButton label="Sign up" onClick={this.signUp} primary />
          </div>
        </SwipeableViews>
        <SnackBar
          open={snackBarActive && !!signError}
          message={signError ? signError.message : ''}
          autoHideDuration={4000}
          onRequestClose={this.hideSnackBar}
          type="warning"
        />
      </div>
    );
  }
}
