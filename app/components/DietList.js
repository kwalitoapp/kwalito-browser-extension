import React, { Component, PropTypes } from 'react';
import { List, ListSubHeader } from 'react-toolbox/lib/list';

import DietListItem from './DietListItem';

export default class DietList extends Component {

  static propTypes = {
    kwalito: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  render() {
    const { kwalito, actions } = this.props;
    const { } = this.state;

    return (
        <List>
          <style dangerouslySetInnerHTML={{__html: `
          ${kwalito.map(diet => `.diet-${diet.id}, .diet-${diet.id} .material-icons, .diet-${diet.id} .material-icons {
              background-color: ${diet.selected ? diet.color : 'white'};
              color: ${diet.selected ? 'white' : diet.color};
              fill: ${diet.selected ? 'white' : diet.color};
            }`
          ).join('\n')}
          `}} />
          <ListSubHeader caption='Mon alimentation' />
          { kwalito.map(diet => <DietListItem diet={diet} actions={actions}/>) }
        </List>
    );
  }
}
