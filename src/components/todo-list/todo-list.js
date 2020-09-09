import React from 'react'
import { useStore } from 'effector-react'
import { TodoListItem } from '../todo-list-item/todo-list-item'
import {
  $toDos,
  onDeleteItem,
  onToggleImportant,
  onToggleDone,
} from '../app/app.model'

import './todo-list.css'

export const TodoList = () => {
  const todos = useStore($toDos)

  const elements = todos ? todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleteItem(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)} />
      </li>
    )
  }) : []

  return (
    <ul className="list-group todo-list">
      {elements}
    </ul>
  )
}