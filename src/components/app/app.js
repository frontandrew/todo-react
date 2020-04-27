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
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Build App'),
    ]
  }

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.nextId++,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter(item => item.id !== id);

      return {
        todoData: newTodoData
      }
    });
  }

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text);
      const newTodoData = [...todoData, newItem]

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