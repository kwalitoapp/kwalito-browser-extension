import React, { Component, PropTypes } from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Switch from 'react-toolbox/lib/switch';
import Checkbox from 'react-toolbox/lib/checkbox';
import FontIcon from 'react-toolbox/lib/font_icon';
import classnames from 'classnames';

import DietItem from './DietItem';
// import Footer from './Footer';
import style from './MainSection.css';

export default class MainSection extends Component {

  static propTypes = {
    kwalito: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { };
  }

  // renderFooter(completedCount) {
  //   const { kwalito } = this.props;
  //   const { filter } = this.state;
  //   const activeCount = kwalito.length - completedCount;
  //
  //   if (kwalito.length) {
  //     return (
  //       <Footer
  //         completedCount={completedCount}
  //         activeCount={activeCount}
  //         filter={filter}
  //         onClearCompleted={this.handleClearCompleted}
  //         onShow={this.handleShow}
  //       />
  //     );
  //   }
  // }

  render() {
    const { kwalito, actions } = this.props;
    const { } = this.state;

    return (
      <section className={style.main}>
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
          {kwalito.map(diet =>
            <ListItem
              className={classnames({
                [`diet-${diet.id}`]: true,
                [style.selected]: diet.selected
              })}
              leftIcon={<span
                className={style.listItemIconWrapper}
                dangerouslySetInnerHTML={{__html: diet.pictureSvg}}
              />}
              itemContent={<span className={style.listItemContent}>{diet.name}</span>}
              rightActions={[<FontIcon>{diet.selected ? 'check_box' : 'check_box_outline_blank'}</FontIcon>, <FontIcon>info_outline</FontIcon>]}
              onClick={() => diet.selected ? actions.deselect(diet.id) : actions.select(diet.id)}
              theme={{
                backgroundColor: diet.selected ? diet.color : 'white',
                color: diet.selected ? 'white' : diet.color,
                fill: diet.selected ? 'white' : diet.color,
                transition: 'backgroundColor 0.2s, color 0.2s'
              }}
            />
          )}
        </List>
      </section>
    );
  }
}
