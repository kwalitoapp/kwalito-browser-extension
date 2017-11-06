import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListSubHeader } from 'react-toolbox/lib/list';

import DietListItem from './DietListItem';

export default class DietList extends Component {

  static propTypes = {
    diets:       PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  render() {
    const { diets, actions } = this.props;
    const { }                               = this.state;

    return (
        <List>
          <style dangerouslySetInnerHTML={{__html: `
          ${diets.map(diet => `.diet-${diet.id}, .diet-${diet.id} .material-icons, .diet-${diet.id} .material-icons {
              background-color: ${diet.selected ? diet.color : 'white'};
              color: ${diet.selected ? 'white' : diet.color};
              fill: ${diet.selected ? 'white' : diet.color};
            }`
          ).join('\n')}
          `}} />
          <ListSubHeader caption='Mon alimentation' />
          { diets.map(diet => <DietListItem key={`dietListItem-${diet.id}`} diet={diet} actions={actions}/>) }
        </List>
    );
  }
}
