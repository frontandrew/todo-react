import React from 'react';

import './app-header.css';

const AppHeader = ({ toDo, done }) => {
  return (
    <div className="app-header d-flex">
      <h1>ToDo&nbsp;List</h1>
      <h2>{toDo}&nbsp;more to&nbsp;do, {done}&nbsp;done</h2>
    </div>
  );

};

export default AppHeader;