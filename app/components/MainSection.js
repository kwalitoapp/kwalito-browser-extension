import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {
    kwalito: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.kwalito.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { kwalito, actions } = this.props;
    if (kwalito.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === kwalito.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { kwalito } = this.props;
    const { filter } = this.state;
    const activeCount = kwalito.length - completedCount;

    if (kwalito.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { kwalito, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = kwalito.filter(TODO_FILTERS[filter]);
    const completedCount = kwalito.reduce(
      (count, todo) => (todo.completed ? count + 1 : count),
      0
    );

    return (
      <section className={style.main}>
        {this.renderToggleAll(completedCount)}
        <ul className={style.todoList}>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}
