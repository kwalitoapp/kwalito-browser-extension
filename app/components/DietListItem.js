import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-toolbox/lib/list';
import { Slider } from 'react-toolbox/lib/slider';
import FontIcon from 'react-toolbox/lib/font_icon';
import classnames from 'classnames';
import style from './DietListItem.css';

export default class DietListItem extends Component {
  static propTypes = {
    diet:     PropTypes.object.isRequired,
    actions:  PropTypes.object.isRequired,
    userDiet: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { diet, actions, userDiet } = this.props;

    const className = classnames({
      [`diet-${diet.id}`]: true,
      [style.selected]: userDiet.selected
    });
    const leftIcon = <span
      className={style.listItemIconWrapper}
      dangerouslySetInnerHTML={{__html: diet.pictureSvg}}
    />;
    const itemContent = <span className={style.listItemContent}>{diet.name}</span>;
    const rightActions = [
      <FontIcon key={`dietListItem-fontIcon-${diet.id}`}>{userDiet.selected ? 'check_box' : 'check_box_outline_blank'}</FontIcon>,
      <FontIcon onClick={() => {actions.rightSideBar.display(diet.description)}} key={`dietListItem-link-${diet.id}`}>info_outline</FontIcon>
    ];
    const onClick = () => actions.kwalito.toggleSelect(diet.id);
    let optionnalComponent;
    if(diet.options.type && diet.options.options){
      const dietOptions = diet.options;
      if(dietOptions.type === 'slide') {
        if(_.isUndefined(userDiet.options.value)){
          userDiet.options.value = dietOptions.options.findIndex((option) => option.id === dietOptions.default.id);
        }
        optionnalComponent = <div className={style.option}>
          <Slider
            min={0}
            max={dietOptions.options.length - 1}
            step={1}
            value={userDiet.options.value}
            onChange={(value) => actions.kwalito.setOptions(diet.id, _.merge({}, userDiet.options, {value}))}
          />
          <div className={style.explanation}>Exclure à partir de <span>{dietOptions.options[userDiet.options.value].name}</span></div>
        </div>
      }
    }
    return <div className={className}>
      <ListItem
        leftIcon={leftIcon}
        itemContent={itemContent}
        rightActions={rightActions}
        onClick={onClick}
      />
      {userDiet.selected && diet.options && diet.options.options ? optionnalComponent : ''}
    </div>;
  }
}
