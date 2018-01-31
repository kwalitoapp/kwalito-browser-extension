import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ToggleCheckBox from 'material-ui/svg-icons/toggle/check-box';
import ToggleCheckBoxOutlineBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import classnames from 'classnames';
import style from './DietListItem.css';

export default class DietListItem extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    diet: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    userDiet: PropTypes.object.isRequired
  };

  buildOptionalComponents() {
    const { diet, actions, userDiet } = this.props;
    const optionalComponents = [];
    if (diet.options.type && diet.options.options) {
      if (_.isUndefined(userDiet.options.value)) {
        userDiet.options.value = diet.options.options.findIndex(option => option.id === diet.options.default.id);
      }
      const dietOptions = diet.options;
      if (dietOptions.type === 'slide') {
        optionalComponents.push( // eslint-disable-line function-paren-newline
          <ListItem
            className={style.option}
            key={`${diet._id}-${dietOptions.type}`}
            style={{
              backgroundColor: 'white'
            }}
            innerDivStyle={{
              margin: 0,
              padding: '10px 20px'
            }}
          >
            <Slider
              className={style.slider}
              min={0}
              max={dietOptions.options.length - 1}
              step={1}
              value={userDiet.options.value}
              onChange={(event, value) => actions.kwalito
                .setOptions(diet._id, _.merge({}, userDiet.options, { value }))}
              style={{}}
              sliderStyle={{
                marginTop: '4px',
                marginBottom: '4px'
              }}
            />
            <div
              className={style.explanation}
              style={{color: diet.color}}
            >
              Exclure à partir de <span>{dietOptions.options[userDiet.options.value].name}</span>
            </div>
          </ListItem>);
      }
    }
    return optionalComponents;
  }

  buildClassNames() {
    const { diet, userDiet } = this.props;
    return classnames({
      [style.dietListItem]: true,
      [`diet-${diet._id}`]: true,
      [style.selected]: userDiet.selected
    });
  }

  buildLeftElement() {
    const { diet } = this.props;
    return (<span
      className={style.listItemIconWrapper}
      dangerouslySetInnerHTML={{ __html: diet.pictureSvg }}
    />);
  }

  buildRightElement() {
    const { language, diet, actions } = this.props;
    return <IconButton
      onClick={() => { actions.rightSideBar.display(diet.locale[language].description); }}
    >
      <ActionInfo color={this.buildStyle().color} />
    </IconButton>;
  }

  buildOnClick() {
    const { diet, actions } = this.props;
    return () => actions.kwalito.toggleSelect(diet._id);
  }

  buildStyle() {
    const { diet, userDiet } = this.props;
    return {
      backgroundColor: userDiet.selected ? diet.color : 'white',
      color: userDiet.selected ? 'white' : diet.color,
      fill: userDiet.selected ? 'white' : diet.color,
    };
  }

  render() {
    const { language, diet, actions, userDiet } = this.props;
    // console.log('DIET', (new Error()).stack.split('\n')[1].trim(), JSON.stringify(diet, null, 2));

    // const itemContent = <span className={style.listItemContent}>{diet.locale[language].name}</span>;
    // const rightActions = [
    //   <FontIcon key={`dietListItem-fontIcon-${diet._id}`}>{userDiet.selected ? 'check_box' : 'check_box_outline_blank'}</FontIcon>,
    //   <FontIcon onClick={() => { actions.rightSideBar.display(diet.locale[language].description); }} key={`dietListItem-link-${diet._id}`}>info_outline</FontIcon>
    // ];
    return (
      <ListItem
        className={this.buildClassNames()}
        key={diet._id}
        leftIcon={this.buildLeftElement()}
        // rightActions={rightActions}
        autoGenerateNestedIndicator={false}
        nestedItems={this.buildOptionalComponents()}
        open={userDiet.selected}
        rightIconButton={this.buildRightElement()}
        onClick={this.buildOnClick()}
        primaryText={diet.locale[language].name}
        style={this.buildStyle()}
        // nestedListStyle={this.buildStyle()}
        nestedListStyle={{
          border: `10px solid ${diet.color}`,
          borderTop: `2px solid ${diet.color}`,
          padding: 0
        }}
      />
    );
  }
}
