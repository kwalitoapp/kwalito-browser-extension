import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListSubHeader, ListDivider, ListItem } from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';
import { Tabs, Tab } from 'react-toolbox/lib/tabs';
import FontIcon from 'react-toolbox/lib/font_icon';
import DietListItem from './DietListItem';

export default class DietList extends Component {

  static propTypes = {
    diets:     PropTypes.array.isRequired,
    userDiets: PropTypes.object.isRequired,
    userIngredients: PropTypes.array.isRequired,
    actions:   PropTypes.object.isRequired,
    ingredientSearchResult: PropTypes.array
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      ingredientSearchString: ''
    }
  }

  removeIngredient(ingredient){
    const { actions } = this.props;
    actions.kwalito.ingredientRemove(ingredient)
      .then(() => {
        return actions.kwalito.ingredientSearch(this.state.ingredientSearchString);
      })
    ;
  }

  addIngredient(ingredient){
    const { actions } = this.props;
    actions.kwalito.ingredientAdd(ingredient)
      .then(() => {
        return actions.kwalito.ingredientSearch(this.state.ingredientSearchString);
      })
    ;
  }

  searchIngredient(value){
    const { actions } = this.props;
    this.setState(_.merge({}, this.state, {ingredientSearchString: value}));
    if(value) {
      actions.kwalito.ingredientSearch(value);
    } else {
      actions.updateState({ingredientSearchResult: null})
    }
  }

  render() {
    const { diets, actions, userDiets, userIngredients, ingredientSearchResult=[] } = this.props;

    return (
      <Tabs index={this.state.index} onChange={(index) => { this.setState({ index }); }} fixed>
        <Tab label='Mes régimes' id="diets">
          <List>
            <style dangerouslySetInnerHTML={{__html: `
              ${diets.map(diet => `.diet-${diet.id}, .diet-${diet.id} .material-icons, .diet-${diet.id} .material-icons {
                  background-color: ${userDiets[diet.id].selected ? diet.color : 'white'};
                  color: ${userDiets[diet.id].selected ? 'white' : diet.color};
                  fill: ${userDiets[diet.id].selected ? 'white' : diet.color};
                }`
              ).join('\n')}
          `}} />
            <ListSubHeader caption='Mon alimentation' />
            { diets.map(diet => <DietListItem
              key={`dietListItem-${diet.id}`}
              diet={diet}
              userDiet={userDiets[diet.id]}
              actions={actions}
            />) }
          </List>
        </Tab>
        <Tab label='Mes ingrédients exclus' id="excludedIngredients">
          <List>
            { userIngredients.map(ingredient => <ListItem
              key={ingredient.ingr}
              caption={ingredient.name}
              rightActions={[<FontIcon onClick={() => this.removeIngredient(ingredient)}>close</FontIcon>]}
            />) }
          </List>
          <Input
            type='text'
            value={this.state.ingredientSearchString}
            label='Exclure un autre ingrédient'
            hint="Tapez le nom d'un ingrédient"
            onChange={this.searchIngredient.bind(this)}
            icon='search'
          />
          <List>
            { ingredientSearchResult.map((ingredient) => <ListItem
              key={ingredient._id}
              caption={ingredient.name}
              rightActions={[<FontIcon onClick={() => this.addIngredient(ingredient)}>add</FontIcon>]}
            />) }
          </List>
        </Tab>
      </Tabs>
    );
  }
}
