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

  toggleProp(arr, id, propName) {
    const newArr = arr.map(item => {
      if (item.id === id) {
        item[propName] = !item[propName]
      }
      return item;
    });
    return newArr;
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'important')
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProp(todoData, id, 'done')
      }
    });
  }

  render() {

    const { todoData } = this.state;

    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm
          onAddItem={this.addItem} />
      </div>
    );
  }
}