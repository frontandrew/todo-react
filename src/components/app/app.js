import React from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';
import { Langs } from '../lang/lang';


import './app.css';

export default class App extends React.Component {
  // using class fields
  nextId = 10;

  state = {
    todoData: [
      {
        label: 'Активная задача',
        important: false,
        done: false,
        id: 1,
      },
      {
        label: 'Завершенная задача',
        important: false,
        done: true,
        id: 3,
      },
      {
        label: 'Важная задача',
        important: true,
        done: false,
        id: 2,
      },      
      {
        label: 'Завершенная важная задача',
        important: true,
        done: true,
        id: 4,
      },
    ],

    //user input from search-panel component
    // default: emty string
    searchInput: '',

    // filter status from item-status-filter component
    // default: string 'all'
    activeFilter: 'all',

    activeLang: 0,
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

  onSearchInput = (searchInput) => {
    this.setState({ searchInput });
  }

  onFilterChange = (activeFilter) => {
    this.setState({ activeFilter });
  }

  searchItems(items, searchInput) {
    if (!searchInput) {
      return items
    }

    return items.filter(item => {
      return item.label.search(new RegExp(searchInput, 'im')) > -1;
    });
  }

  filterItems(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter(item => !item.done)
      case 'done':
        return items.filter(item => item.done)
      default:
        return items;
    }
  }

  langChanger = () => {
    console.log('langChanger' + this.state.activeLang + (Langs.length));
    if (this.state.activeLang < (Langs.length - 1)) {
      this.setState((state) => {
        return state.activeLang = state.activeLang + 1;
      })
    } else {
      this.setState({ activeLang: 0 })
    }
  }

  render() {

    const { todoData, searchInput, activeFilter, activeLang } = this.state;

    const visibleItems = this.filterItems(
      this.searchItems(todoData, searchInput), activeFilter);

    const doneCount = todoData.filter(item => item.done).length;
    const todoCount = todoData.length - doneCount;

    const lang = Langs[activeLang];

    return (
      <div className="todo-app" >
        <AppHeader
          toDo={todoCount}
          done={doneCount}
          lang={lang}
          langChanger={this.langChanger} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchInput={this.onSearchInput} lang={lang} />
          <ItemStatusFilter
            lang={lang}
            filter={activeFilter}
            onFilterChange={this.onFilterChange} />
        </div>
        <TodoList todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone} />
        <ItemAddForm onAddItem={this.addItem} lang={lang} />
      </div>
    );
  }
}