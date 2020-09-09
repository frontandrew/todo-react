import React, { useEffect } from 'react';

import { AppHeader } from '../app-header/app-header';
import { SearchPanel } from '../search-panel/search-panel';
import { TodoList } from '../todo-list/todo-list';
import { ItemStatusFilter } from '../item-status-filter/item-status-filter';
import { ItemAddForm } from '../item-add-form/item-add-form';

import './app.css';

import { appMounted } from './app.model';

export const App = () => {
  useEffect(() => appMounted(), []);

  return (
    <div className="todo-app" >
      <AppHeader />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>
      <TodoList />
      <ItemAddForm />
    </div>
  );
}