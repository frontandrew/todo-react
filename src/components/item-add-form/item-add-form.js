import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {


  render() {
    const { onAddItem } = this.props;

    return (
      <div className="item-add-form">
        <button
          className="btn btn-outline-secondary"
          onClick={() => onAddItem('Hello World!')}>
          New Item
        </button>
      </div>
    )
  }
}