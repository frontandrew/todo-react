import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';


import './app.css';

export default class App extends React.Component {
  // using class fields
  nextId = 10;

  state = {
    todoData: [
      { id: 1, important: false, done: false, label: 'Drink Coffee' },
      { id: 2, important: false, done: false, label: 'Learn React' },
      { id: 3, important: false, done: false, label: 'Build App' },
    ]
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(item => item.id !== id);

      return {
        todoData: newTodoData
      }
    });
  }

  addItem = () => {
    this.setState(({ todoData }) => {

      const newTodoData = [...todoData, { id: this.nextId++, important: false, done: false, label: `Task ${this.nextId}` },]

      return {
        todoData: newTodoData
      }
    });
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map(item => {
        if (item.id === id) {
          item.important = !item.important
        }
        return item;
      });
      
      console.log(`Toggled important: Item${id}`);
      return {
        todoData: newTodoData
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.map(item => {
        if (item.id === id) {
          item.done = !item.done
        }
        return item;
      });
      
      console.log(`Toggled done: Item${id}`);
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
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm
          onAddItem={this.addItem} />
      </div>
    );
  }
}