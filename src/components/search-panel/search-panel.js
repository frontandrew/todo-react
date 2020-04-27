import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
  return (
    <input placeholder="type to search"
      className="form-control search-input"
      type="text"
    />
  );
}

export default SearchPanel;