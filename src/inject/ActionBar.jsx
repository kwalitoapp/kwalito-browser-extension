import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { autobind } from 'core-decorators';
import IconStar from 'material-ui/svg-icons/toggle/star';
import IconThumbDown from 'material-ui/svg-icons/action/thumb-down';
import IconThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from './IconButton';
import Badged from './Badged';
import { capitalize } from './utils';
import style from './ActionBar.css';


export default class ActionBar extends Component {
  static propTypes = {
    displayRetainer: PropTypes.array.isRequired,
    retainDisplay: PropTypes.func.isRequired,
    releaseDisplay: PropTypes.func.isRequired,
    favorite: PropTypes.bool.isRequired,
    onFavorite: PropTypes.func.isRequired,
    dislike: PropTypes.bool.isRequired,
    onDislike: PropTypes.func.isRequired,
    like: PropTypes.bool.isRequired,
    onLike: PropTypes.func.isRequired,
    contributions: PropTypes.array.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const { contributions } = this.props;
    this.retainerName = 'ActionBar';
    this.state = { showCommentModal: false };
  }

  @autobind
  handleModalClose() {
    const { releaseDisplay } = this.props;
    releaseDisplay(this.retainerName);
    this.setState({ ...this.state, showCommentModal: false });
  }

  @autobind
  onComment(event, comment) {
    this.setState({ ...this.state, comment });
  }

  @autobind
  saveComment() {
    const { comment, buttonToToggle } = this.state;
    const { releaseDisplay } = this.props;
    // const buttonToTurnOff = (buttonToToggle === 'like' ? 'dislike' : 'like');
    // if(this.props[buttonToTurnOff]){
    //   this.props[`on${capitalize(buttonToTurnOff)}`](false);
    // }
    this.props[`on${capitalize(buttonToToggle)}`](true, comment);
    releaseDisplay(this.retainerName);
    this.setState({
      ...this.state,
      comment: undefined,
      buttonToToggle: undefined,
      showCommentModal: false
    });
  }

  @autobind
  onLike() {
    const { like, onLike, retainDisplay } = this.props;
    if (like) {
      return onLike(false);
    }
    retainDisplay(this.retainerName);
    this.setState({ ...this.state, buttonToToggle: 'like', showCommentModal: true });
  }

  @autobind
  onDislike() {
    const { dislike, onDislike, retainDisplay } = this.props;
    if (dislike) {
      return onDislike(false);
    }
    retainDisplay(this.retainerName);
    this.setState({ ...this.state, buttonToToggle: 'dislike', showCommentModal: true });
  }

  render() {
    const { displayRetainer, favorite, onFavorite, dislike, like, contributions } = this.props;
    const { showCommentModal } = this.state;

    let nbLikes = 0;
    let nbDislikes = 0;
    console.log('recalculating likes and dislikes based on contributions', contributions);
    contributions.forEach((contribution) => {
      if (contribution.positive) {
        nbLikes++;
      } else {
        nbDislikes++;
      }
    });

    const actions = [
      <FlatButton
        label="Annuler"
        primary
        onClick={this.handleModalClose}
      />,
      <FlatButton
        label="Envoyer"
        primary
        onClick={this.saveComment}
      />,
    ];

    return (
      <div
        className={classNames({
          [style.actionBar]: true,
          [style.displayMore]: (displayRetainer.length > 0)
        })}
      >
        <div className={style.favorite}>
          <IconButton icon={<IconStar />} selected={favorite} handler={onFavorite} />
        </div>
        <Badged value={nbDislikes}>
          <IconButton icon={<IconThumbDown />} selected={dislike} handler={this.onDislike} />
        </Badged>
        <Badged value={nbLikes}>
          <IconButton icon={<IconThumbUp />} selected={like} handler={this.onLike} />
        </Badged>
        <Dialog
          title="Un avis sur ce produit ?"
          actions={actions}
          modal={false}
          open={showCommentModal}
          onRequestClose={this.handleModalClose}
          contentStyle={{width: '100%', maxWidth: 'none'}}
        >
          <TextField
            type="text"
            name="comment"
            value={this.state.comment}
            hintText="Partagez votre avis ou recommandez un produit similaire"
            onChange={this.onComment}
            multiLine
            rows={2}
            rowsMax={4}
            fullWidth
          />
        </Dialog>
      </div>
    );
  }
}
