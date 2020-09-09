import { createEvent, createStore, sample, restore } from 'effector'
import { Langs } from '../lang/lang'

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

const getNextId = () => (Math.floor(Math.random() * 1000000))

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
export const $newId = createStore(0)
export const $lang = createStore(Langs['en'])
export const $addInput = restore(onLabelChanged, '')
export const $toDos = restore(appMounted, initData)

$toDos
  .on(
    sample({
      source: { $newId, $addInput },
      clock: onAddItem,
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
  .watch(x => console.log(x, '$toDos'))

$newId
  .on(onAddItem, () => getNextId())
  .watch(x => console.log(x, 'nextId'))

$addInput
  .on(onLabelChanged, (state, text) => text)
  .reset($toDos.updates)
  .watch(x => console.log(x, '$addInput'))

$haveToDos
  .on($toDos.updates, (state, todos) => todos.length)
  .watch(x => console.log(x, '$haveToDos'))

$haveDone
  .on($toDos.updates, (state, todos) =>
    todos.filter(({ done }) => done).length
  )
  .watch(x => console.log(x, '$haveDone'))

