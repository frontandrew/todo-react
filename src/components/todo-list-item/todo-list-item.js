import React from 'react';

import './todo-list-item.css';

export default class TodoListItem extends React.Component {

  state = {
    done: false,
    important: false
  }

  onLabelClick = () => {
    this.setState(state => ({ done: !state.done }));
  }

  onMarkImportant = () => {
    this.setState(state => ({ important: !state.important }));
  }

  render() {

    const { label, onDeleted } = this.props;
    const { done, important } = this.state;

    const classNames = `todo-list-item ${done ? 'done' : ''} ${important ? 'important' : ''}`;

    return (
      <span className={classNames}>

        <span
          className="todo-list-item-label"
          onClick={this.onLabelClick}>
          {label}
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={this.onMarkImportant}>
          <i className="fa fa-exclamation" />
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>

      </span>
    );
  }
}