import React from 'react';
import { useStore } from 'effector-react';

import {
  $lang,
  $toDo,
  $done,
  onToggleLang,
} from '../app/app.model';

import './app-header.css';

export const AppHeader = () => {
  const { textMoreToDo, textDone, textToDoList, label, indicator } = useStore($lang);
  const toDo = useStore($toDo);
  const done = useStore($done);

  return (
    <div className="app-header d-flex ">
      <h1>{textToDoList}</h1>
      <button
        className="btn btn-outline-secondary btn-sm app-header__lang"
        onClick={() => onToggleLang(indicator)}>
        {label}
      </button>
      <h2>{toDo}{textMoreToDo}{done}{textDone}</h2>
    </div>
  );

};