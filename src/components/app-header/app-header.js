import React from 'react'
import { Button, makeStyles } from '@material-ui/core'

import { useStore } from 'effector-react'
import { $lang, $haveToDos, $haveDone, onToggleLang } from '../app/app.model'

import './app-header.css'

const styles = makeStyles({
  langButtonRoot: {
    fontWeight: '700',
    fontSize: '0.675rem',
    width: '40px',
    minWidth: 0,
    position: "absolute",
    opacity: .8,
    top: '-14px',
    right: 0,
    '&:hover': {
      opacity: 1,
    }
  },
})

export const AppHeader = () => {
  const {
    textMoreToDo,
    textDone,
    textToDoList,
    label,
    id,
  } = useStore($lang)
  const toDo = useStore($haveToDos)
  const done = useStore($haveDone)

  const { langButtonRoot, lable } = styles();

  return (
    <div className="app-header d-flex ">
      <h1>{textToDoList}</h1>
      <Button
        classes={{ root: langButtonRoot }}
        variant='outlined'
        onClick={() => onToggleLang(id)}>
        {label}
      </Button>
      <h2>{toDo}{textMoreToDo}{done}{textDone}</h2>
    </div>
  )
}