import React from 'react';
import { useStore } from 'effector-react';

import {
  $addInput,
  $lang,
  onLabelChanged,
  onAddItem,
} from '../app/app.model';

import './item-add-form.css';

export const ItemAddForm = () => {
  const { textAddItemInput, textNewItem } = useStore($lang);
  const addInput = useStore($addInput);

  const onChange = e => {
    e.preventDefault();
    onAddItem();
  }
    
    return (
      <form
        className="item-add-form d-flex"
        onSubmit={e => onChange(e)}>
        <input
          type="text"
          placeholder={textAddItemInput}
          className="form-control"
          value={addInput}
          onChange={e => onLabelChanged(e.target.value)} />
        <button
          className="btn btn-outline-secondary">
          {textNewItem}
        </button>
      </form>
    )
  
}