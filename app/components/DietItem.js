import React, { Component, PropTypes } from 'react';
import Link from 'react-router-redux-dom-link';
import classnames from 'classnames';
import { IconInfo } from '../constants/Icons';
import style from './DietItem.css';

export default class DietItem extends Component {

  static propTypes = {
    diet: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired,
    moreInfo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: false
    };
  }

  handleSelect = () => {
    const { diet, select, deselect } = this.props;
    if(this.state.selected){
      deselect(diet.id);
    } else {
      select(diet.id);
    }
  };

  handleMoreInfo = () => {
    const { diet, moreInfo } = this.props;
    moreInfo(diet.id);
  };

  render() {
    const { diet } = this.props;

    const itemStyle = {
      backgroundColor: diet.selected ? diet.color : 'white',
      color: diet.selected ? 'white' : diet.color,
      fill: diet.selected ? 'white' : diet.color,
      transition: 'backgroundColor 0.2s, color 0.2s'
  };

    return (
      <li
        className={classnames({
          [style.dietItem]: true,
          [style.selected]: diet.selected
        })}
        style={itemStyle}
        onClick={this.handleSelect}
      >
        <div
          className={style.iconWrapper}
          dangerouslySetInnerHTML={{__html: diet.pictureSvg}}
        >
        </div>
        <label>{diet.name}</label>
        <Link to={`/moreInfo/${diet.id}`}>
          <button
            className={style.moreInfo}
            style={itemStyle}
           // onClick={this.handleMoreInfo}
          >
            <IconInfo />
          </button>
        </Link>
      </li>
    );
  }
}
