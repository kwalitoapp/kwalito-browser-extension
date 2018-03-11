import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { autobind } from 'core-decorators';
import { ListSubHeader, ListDivider, ListCheckbox } from 'material-ui/List';
import { Tab, Tabs } from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { recvMessage, sendMessage } from '../messaging';
import DietReason from './DietReason';
import Logo from './Logo';
import ActionBar from './ActionBar';
import theme, * as themeColors from '../theme';
import style from './App.css';

export default class InjectApp extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    fitsMe: PropTypes.bool.isRequired,
    badIngredients: PropTypes.array.isRequired,
    badTraces: PropTypes.array.isRequired,
    favorite: PropTypes.bool,
    contributions: PropTypes.array.isRequired
  };

  static defaultProps = {
    favorite: false
  };

  constructor(props, context) {
    super(props, context);
    const { favorite, contributions } = this.props;
    this.state = {
      displayRetainer: ['startup'],
      favorite,
      contributions,
      ...this.getLikeAndDislikeFromContributions(contributions)
    };
    this.retainerName = 'App';
    this.setMessageListener();
    setTimeout(() => this.releaseDisplay('startup'), 3000);
  }

  setMessageListener() {
    recvMessage({
      setFavorite: favorite => this.setState({ ...this.state, favorite }),
      setContributions: contributions => this.setState({ ...this.state, contributions, ...this.getLikeAndDislikeFromContributions(contributions) })
    });
  }

  getLikeAndDislikeFromContributions(contributions) {
    const { user, product } = this.props;
    let like = false;
    let dislike = false;
    contributions.forEach((contribution) => {
      if(contribution._id === `comment-${product.ean}-${user._id}`){
        like = contribution.positive === true;
        dislike = contribution.positive === false;
      }
    });
    console.log('like and dislike:', { like, dislike });
    return {like, dislike};
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
    console.log('retain display for ', source);
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
    const { favorite } = this.state;
    sendMessage(window.parent, 'setFavorite', { ean: product.ean, active: !favorite });
  }

  @autobind
  onLike(active, comment) {
    const { product } = this.props;
    sendMessage(window.parent, 'setLike', { ean: product.ean, active, comment });
  }

  @autobind
  onDislike(active, comment) {
    const { product } = this.props;
    sendMessage(window.parent, 'setDislike', { ean: product.ean, active, comment });
  }

  @autobind
  renderReasons(reasons) {
    const { product, badIngredients, badTraces } = this.props;
    const rendered = [];
    _.map(reasons.diet, diet => rendered.push(
      <DietReason
        key={`dietReason-${diet.name}`}
        reason={{ type: 'diet', ...diet }}
        badIngredients={badIngredients}
        badTraces={badTraces}
      />
    ));
    if(reasons.user.length > 0){
      rendered.push(
        <DietReason
          key={'dietReason-user'}
          reason={{ type: 'user', ingredients: reasons.user }}
          badIngredients={badIngredients}
          badTraces={badTraces}
        />
      );
    }
    rendered.push(
      <DietReason
        key={'dietReason-traces'}
        reason={{ type: 'traces', ingredients: product.traces }}
        badIngredients={badIngredients}
        badTraces={badTraces}
      />
    );
    rendered.push(
      <DietReason
        key={'dietReason-ingredients'}
        reason={{ type: 'ingredients', ingredients: product.ingredients }}
        badIngredients={badIngredients}
        badTraces={badTraces}
      />
    );
    return rendered;
  }

  renderContributions(contributions) {
    console.log('Render contributions:', contributions);
    const renderedContributions = contributions
      .filter(contribution => contribution.comment)
      .sort((a, b) => (b.timestamp - a.timestamp))
      .map(contribution => (
        <ListItem
          primaryText={contribution.comment}
          secondaryText={moment.duration(contribution.timestamp - new Date().getTime()).humanize(true)}
          style={{color: contribution.positive ? themeColors.green : themeColors.red}}
        />
      ));
    return (<List>{renderedContributions}</List>);
  }

  render() {
    const { fitsMe, badIngredients, badTraces } = this.props;
    const { favorite, like, dislike, displayRetainer, contributions } = this.state;
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
            contributions={contributions}
          />
          <Tabs
            className={style.tabs}
            value={this.state.tabIndex}
            onChange={(newIndex) => { this.setState({...this.state, tabIndex: newIndex}); }}
            tabItemContainerStyle={{ backgroundColor: fitsMe ? themeColors.green : themeColors.red }}
            inkBarStyle={{ backgroundColor: fitsMe ? themeColors.greenDark : themeColors.redDarker }}
          >
            <Tab label="Ingrédients" value={0} />
            <Tab label={`${contributions.filter(contr => contr.comment).length} commentaires`} value={1} />
          </Tabs>
          <SwipeableViews index={this.state.tabIndex}>
            <div className={style.reasons}>
              {this.renderReasons(reasons)}
            </div>
            <div className={style.comments}>
              {this.renderContributions(contributions)}
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
