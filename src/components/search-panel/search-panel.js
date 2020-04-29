import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchInput }) => {
  return (
    <input type="text"
      placeholder="type to search"
      className="form-control search-input"      
      onInput={event => onSearchInput(event.target.value)}
    />
  );
}

export default SearchPanel;