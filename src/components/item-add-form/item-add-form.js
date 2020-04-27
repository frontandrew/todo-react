import React from 'react';

import './item-add-form.css';

export default class ItemAddForm extends React.Component {

  state = {
    label: ''
  }

  onLabelChahge = (event) => {
    this.setState({
      label: event.target.value
    });    
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    });
  }

  render() {
    
    return (
      <form
        className="item-add-form d-flex"
        onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="What needs to be done"
          className="form-control"
          value={this.state.label}
          onChange={this.onLabelChahge} />
        <button
          className="btn btn-outline-secondary">
          New&nbsp;Item
        </button>
      </form>
    )
  }
}