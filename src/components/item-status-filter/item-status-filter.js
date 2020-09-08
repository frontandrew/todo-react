import React from 'react';
import { useStore } from 'effector-react';

import {
  $filter,
  $lang,
  onFilterChange,
} from '../app/app.model';

import './item-status-filter.css';

export const ItemStatusFilter = () => {  
    const { textFilterAll, textFilterActive, textFilterDone } = useStore($lang);
    const filter = useStore($filter);

    const btns = [
      { name: 'all', label: textFilterAll },
      { name: 'active', label: textFilterActive },
      { name: 'done', label: textFilterDone },
    ];

    const buttons = btns.map(({ name, label }) => {
      
      const classNames = (filter === name) ? 'btn btn-info' : 'btn btn-outline-secondary';
      return (
        <button
          key={name}
          type="button"
          className={classNames}
          onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });
    
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
}