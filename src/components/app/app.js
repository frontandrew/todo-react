import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';

import './app.css';

export default class App extends React.Component {

  state = {
    todoData: [
      { id: 1, label: 'Drink Coffee' },
      { id: 2, label: 'Learn React' },
      { id: 3, label: 'Build App' },
    ]
  }

  deleteItem = (id) => {
    console.log(`Deleted item with id${id}`);

    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(item => item.id !== id);

      console.log('Updated state: ' + this.state.todoData);

      return {
        todoData: newTodoData
      }      
    });
  }

  render() {
    return (
      <div className="todo-app">
        <AppHeader toDo={1} done={3} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={this.state.todoData}
          onDeleted={this.deleteItem} />
      </div>
    );
  }
}