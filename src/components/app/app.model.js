import {
  createEvent,
  createStore,
  sample,
  restore,
  guard,
  combine,
} from 'effector'

import { LANGS as langs } from '../lang'

const initData = [
  {
    label: 'Активная задача',
    important: false,
    done: false,
    id: 1,
  },
  {
    label: 'Завершенная задача',
    important: false,
    done: true,
    id: 3,
  },
  {
    label: 'Важная задача',
    important: true,
    done: false,
    id: 2,
  },
  {
    label: 'Завершенная важная задача',
    important: true,
    done: true,
    id: 4,
  },
]

const prepareToDos = ({ todos, filter, search }) => {

  const filteredToDos = (todos, filter) => {
    switch (filter) {
      case 'all': return todos
      case 'active': return todos.filter(({ done }) => !done)
      case 'done': return todos.filter(({ done }) => done)
      default: return todos
    }
  }

  const searchedToDos = (search, todos) => !!search
    ? todos.filter(({ label }) => label.search(new RegExp(search, 'gim')) > -1)
    : todos

  return searchedToDos(search, filteredToDos(todos, filter))
}

export const appMounted = createEvent()
export const onAddItem = createEvent()
export const onDeleteItem = createEvent()
export const onToggleImportant = createEvent()
export const onToggleDone = createEvent()
export const onToggleLang = createEvent()
export const onLabelChanged = createEvent()
export const onFilterChange = createEvent()
export const onSearchInput = createEvent()

export const $haveToDos = createStore(0)
export const $haveDone = createStore(0)
export const $search = restore(onSearchInput, '')
export const $filter = restore(onFilterChange, 'all')
export const $newId = createStore(10)
export const $lang = createStore(langs[0])
export const $addInput = restore(onLabelChanged, '')
export const $toDos = createStore(null)
export const $render = combine(
  { $toDos, $filter, $search },
  ({ $toDos: todos, $filter: filter, $search: search }) =>
    prepareToDos({ todos, filter, search })
)

$toDos
  .on(appMounted, () => {
    console.log('Yo! App was mounted! ENJOY!')
    return initData
  })
  .on(
    sample({
      source: combine({ $newId, $addInput }),
      clock: guard(onAddItem, { filter: $addInput }),
      fn: ({ $newId: id, $addInput: label }, _) =>
        ({ id, label, important: false, done: false })
    }),
    (state, todo) => ([...state, todo])
  )
  .on(
    onToggleDone,
    (state, id) => state.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  )
  .on(
    onToggleImportant,
    (state, id) => state.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    )
  )
  .on(onDeleteItem, (state, id) => state.filter(todo => todo.id !== id))

$newId
  .on(onAddItem, (state, _) => state + 1)

$addInput
  .on(onLabelChanged, (state, text) => text)
  .reset($toDos.updates)

$haveToDos
  .on($toDos.updates, (state, todos) => todos.length)

$haveDone
  .on($toDos.updates, (state, todos) =>
    todos.filter(({ done }) => done).length
  )

$lang
  .on(onToggleLang, (state, id) => langs[Number(id) ? 0 : 1])
