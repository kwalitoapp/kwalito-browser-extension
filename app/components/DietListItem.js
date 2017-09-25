import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-redux-dom-link'
import { ListItem } from 'react-toolbox/lib/list';
import FontIcon from 'react-toolbox/lib/font_icon';
import classnames from 'classnames';

import style from './DietListItem.css';

export default class DietListItem extends Component {

  static propTypes = {
    diet: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  render() {
    const { diet, actions } = this.props;
    const { } = this.state;

    const className = classnames({
      [`diet-${diet.id}`]: true,
      [style.selected]: diet.selected
    });
    const leftIcon = <span
      className={style.listItemIconWrapper}
      dangerouslySetInnerHTML={{__html: diet.pictureSvg}}
    />;
    const itemContent = <span className={style.listItemContent}>{diet.name}</span>;
    const rightActions = [
      <FontIcon key={`dietListItem-fontIcon-${diet.id}`}>{diet.selected ? 'check_box' : 'check_box_outline_blank'}</FontIcon>,
      <Link to={`/moreInfo/${diet.id}`} key={`dietListItem-link-${diet.id}`}><FontIcon>info_outline</FontIcon></Link>
    ];
    const onClick = () => actions.toggleSelect(diet.id);
    return <ListItem
      className={className}
      leftIcon={leftIcon}
      itemContent={itemContent}
      rightActions={rightActions}
      onClick={onClick}
    />;
  }
}
