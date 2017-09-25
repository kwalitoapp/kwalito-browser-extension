import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div
        dangerouslySetInnerHTML={{__html: diet.description}}
      >

      </div>
    );
  }
}
