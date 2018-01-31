import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autobind } from 'core-decorators';
import { List, ListItem } from 'material-ui/List';
import SubHeader  from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FontIcon from 'material-ui/FontIcon';
import DietListItem from './DietListItem';

export default class DietList extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    diets: PropTypes.array.isRequired,
    userDiets: PropTypes.object.isRequired,
    userIngredients: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    ingredientSearchResult: PropTypes.array
  };

  static defaultProps = {
    ingredientSearchResult: []
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      ingredientSearchString: ''
    };
  }

  removeIngredient(ingredient) {
    const { actions } = this.props;
    actions.kwalito.ingredientRemove(ingredient)
      .then(() => actions.kwalito.ingredientSearch(this.state.ingredientSearchString));
  }

  addIngredient(ingredient) {
    const { actions } = this.props;
    actions.kwalito.ingredientAdd(ingredient)
      .then(() => actions.kwalito.ingredientSearch(this.state.ingredientSearchString));
  }

  @autobind
  searchIngredient(event, value) {
    const { actions } = this.props;
    this.setState(_.merge({}, this.state, { ingredientSearchString: value }));
    if (value && value.length >= 2) {
      actions.kwalito.ingredientSearch(value);
    } else {
      actions.kwalito.updateState({ ingredientSearchResult: [] }, 'assign');
    }
  }

  @autobind
  slideTo(index) {
    this.setState({ index });
  }

  render() {
    const {language, diets, actions, userDiets, userIngredients, ingredientSearchResult} = this.props;

    return (
      <div>
        <Tabs value={this.state.index} onChange={this.slideTo}>
          <Tab label="Mes régimes" value={0} />
          <Tab label="Mes ingrédients exclus" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.index}
          onChangeIndex={this.slideTo}
        >
          <div id="diets">
            <List>
              {/*<style dangerouslySetInnerHTML={{*/}
                {/*__html: `*/}
              {/*${diets.map(diet => `.diet-${diet._id}, .diet-${diet._id} * {*/}
                  {/*background-color: ${userDiets[diet._id].selected ? diet.color : 'white'};*/}
                  {/*color: ${userDiets[diet._id].selected ? 'white' : diet.color};*/}
                  {/*fill: ${userDiets[diet._id].selected ? 'white' : diet.color};*/}
                {/*}*/}
                {/*.diet-${diet._id}.selected, .diet-${diet._id} * {*/}
                  {/*background-color: ${userDiets[diet._id].selected ? diet.color : 'white'};*/}
                  {/*color: ${userDiets[diet._id].selected ? 'white' : diet.color};*/}
                  {/*fill: ${userDiets[diet._id].selected ? 'white' : diet.color};*/}
                {/*}`).join('\n')}*/}
          {/*`*/}
              {/*}}*/}
              {/*/>*/}
              <SubHeader />
              { diets.map(diet => (<DietListItem
                key={`dietListItem-${diet._id}`}
                language={language}
                diet={diet}
                userDiet={userDiets[diet._id]}
                actions={actions}
              />)) }
            </List>
          </div>
          <div id="excludedIngredients">
            <List>
              { userIngredients.map(ingredient => (<ListItem
                key={ingredient.ingr}
                primaryText={ingredient.name}
                rightIconButton={<IconButton onClick={() => this.removeIngredient(ingredient)}><NavigationClose /></IconButton>}
              />)) }
            </List>
            <TextField
              type="text"
              name="ingredientSearch"
              value={this.state.ingredientSearchString}
              label="Exclure un autre ingrédient"
              hintText="Tapez le nom d'un ingrédient"
              onChange={this.searchIngredient}
              icon="search"
            />
            <List>
              { ingredientSearchResult.map(ingredient => (<ListItem
                key={ingredient._id}
                primaryText={ingredient.name}
                rightIconButton={<IconButton onClick={() => this.addIngredient(ingredient)}><ContentAdd /></IconButton>}
              />)) }
            </List>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
