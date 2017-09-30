import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import * as routes from '../utils/routes';

export default class MoreInfoSection extends Component {

  static propTypes = {
    diet: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  render() {
    const { diet } = this.props;

    return (
      <div>
        <Link to={routes.diets()} key={`hello-key-${diet.id}`}>Diets</Link>
        <div
          dangerouslySetInnerHTML={{__html: diet.description}}
        />
      </div>
    );
  }
}
