import React from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends React.Component {  
  
  render() {
    const { textFilterAll, textFilterActive, textFilterDone } = this.props.lang;

    const btns = [
      { name: 'all', label: textFilterAll },
      { name: 'active', label: textFilterActive },
      { name: 'done', label: textFilterDone },
    ];

    const { filter, onFilterChange } = this.props;
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
}