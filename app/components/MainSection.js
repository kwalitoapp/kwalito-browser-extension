import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DietList from './DietList';

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
    return (
      <section>
        <DietList {...this.props}/>
      </section>
    );
  }
}
