import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { autobind } from 'core-decorators';
import { ListSubHeader, ListDivider, ListCheckbox } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { recvMessage, sendMessage } from '../messaging';
import DietReason from './DietReason';
import Logo from './Logo';
import ActionBar from './ActionBar';
import theme from '../theme';
import style from './App.css';

export default class InjectApp extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    fitsMe: PropTypes.bool.isRequired,
    badIngredients: PropTypes.array.isRequired,
    badTraces: PropTypes.array.isRequired,
    favorite: PropTypes.bool,
    like: PropTypes.bool,
    dislike: PropTypes.bool,
  };

  static defaultProps = {
    favorite: false,
    like: false,
    dislike: false,
  };

  constructor(props, context) {
    super(props, context);
    const { favorite, like, dislike } = this.props;
    this.state = {
      displayRetainer: ['startup'],
      favorite,
      like,
      dislike
    };
    this.retainerName = 'App';
    this.setMessageListener();
    setTimeout(() => this.releaseDisplay('startup'), 3000);
  }

  setMessageListener() {
    recvMessage({
      setFavorite: data => this.setState({ ...this.state, favorite: data.favorite }),
      setLike: data => this.setState({ ...this.state, like: data.like }),
      setDislike: data => this.setState({ ...this.state, dislike: data.dislike })
    });

  }

  buildReasons(ingredient, reasons) {
    _.forEach(ingredient.reasons, (reason) => {
      if (reason.type === 'diet') {
        if (!reasons.diet[reason.diet._id]) {
          reasons.diet[reason.diet._id] = {
            diet: reason.diet,
            ingredients: []
          };
        }
        reasons.diet[reason.diet._id].ingredients.push(ingredient.ingredient);
      } else if (reason.type === 'user') {
        reasons.user.push(ingredient.ingredient);
      }
    });
  }

  @autobind
  retainDisplay(source) {
    const { displayRetainer } = this.state;
    if(displayRetainer.length === 0) {
      sendMessage(window.parent, 'iframeStyle', {
        styles: {
          boxShadow: '2px 2px 8px 0px rgba(0, 0, 0, 0.7)'
        }
      });
    }
    if(displayRetainer.indexOf(source) === -1) {
      this.setState({ ...this.state, displayRetainer: displayRetainer.concat([source]) });
    }
  }

  @autobind
  releaseDisplay(source) {
    const { displayRetainer } = this.state;
    const index = displayRetainer.indexOf(source);
    if(index !== -1){
      if(displayRetainer.length === 1) {
        sendMessage(window.parent, 'iframeStyle', {
          styles: {
            boxShadow: 'none'
          }
        });
      }
      const newDisplayRetainer = displayRetainer.slice(0, index)
        .concat(displayRetainer.slice(index + 1));
      this.setState({ ...this.state, displayRetainer: newDisplayRetainer });
    }
  }

  @autobind
  onFavorite() {
    const { product } = this.props;
    sendMessage(window.parent, 'setFavorite', { ean: product.ean });
  }

  @autobind
  onLike() {
    const { like } = this.state;
    sendMessage(window.parent, 'setLike', { like: !like });
  }

  @autobind
  onDislike() {
    const { dislike } = this.state;
    sendMessage(window.parent, 'setDislike', { dislike: !dislike });
  }

  render() {
    const { product, fitsMe, badIngredients, badTraces } = this.props;
    const { favorite, like, dislike, displayRetainer } = this.state;
    // const tagSize = 96;
    const reasons = {
      diet: {},
      traces: [],
      user: []
    };
    _.forEach(badIngredients, ingr => this.buildReasons(ingr, reasons));
    _.forEach(badTraces, ingr => this.buildReasons(ingr, reasons));
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div
          id={style.kwalitoInjectApp}
          className={classNames({
            [style.displayMore]: (displayRetainer.length > 0),
            [style.fitsMe]: fitsMe,
          })}
          onMouseLeave={() => this.releaseDisplay(this.retainerName)}
        >
          <Logo
            fitsMe={fitsMe}
            displayRetainer={displayRetainer}
            onMouseEnter={() => this.retainDisplay(this.retainerName)}
          />
          <ActionBar
            displayRetainer={displayRetainer}
            retainDisplay={this.retainDisplay}
            releaseDisplay={this.releaseDisplay}
            favorite={favorite}
            onFavorite={this.onFavorite}
            dislike={dislike}
            onDislike={this.onDislike}
            like={like}
            onLike={this.onLike}
          />
          <div className={style.reasons}>
            <h2>Ingrédients</h2>
            <div>
              {_.map(reasons.diet, diet => <DietReason reason={{ type: 'diet', ...diet }} badIngredients={badIngredients} badTraces={badTraces} />)}
              <DietReason reason={{ type: 'user', ingredients: reasons.user }} badIngredients={badIngredients} badTraces={badTraces} />
              <DietReason reason={{ type: 'traces', ingredients: product.traces }} badIngredients={badIngredients} badTraces={badTraces} />
              <DietReason reason={{ type: 'ingredients', ingredients: product.ingredients }} badIngredients={badIngredients} badTraces={badTraces} />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
