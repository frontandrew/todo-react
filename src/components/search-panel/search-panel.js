import React from 'react';
import { useStore } from 'effector-react';

import {
  $lang,
  onSearchInput,
} from '../app/app.model';

import './search-panel.css';

export const SearchPanel = () => {
  const { textTypeToSearch } = useStore($lang);

  return (
    <input type="text"
      placeholder={textTypeToSearch}
      className="form-control search-input"
      onInput={event => onSearchInput(event.target.value)}
    />
  );
}