import React, { Component, PropTypes } from 'react';
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
        <ul className={style.todoList}>
          {kwalito.map(diet =>
            <DietItem key={diet.id} diet={diet} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}
