import React from 'react';

import './app-header.css';

const AppHeader = ({ toDo, done, lang, langChanger }) => {
  const { textMoreToDo, textDone, textToDoList } = lang;

  return (
    <div className="app-header d-flex ">
      <h1>{textToDoList}</h1>
      <button
        className="btn btn-outline-secondary btn-sm app-header__lang"
        onClick={langChanger}>
        {lang.label}
      </button>
      <h2>{toDo}{textMoreToDo}{done}{textDone}</h2>
    </div>
  );

};

export default AppHeader;