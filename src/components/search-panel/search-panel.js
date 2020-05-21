import React from 'react';

import './search-panel.css';

const SearchPanel = ({ onSearchInput, lang }) => {
  return (
    <input type="text"
      placeholder={lang.textTypeToSearch}
      className="form-control search-input"      
      onInput={event => onSearchInput(event.target.value)}
    />
  );
}

export default SearchPanel;