import { createEvent, createStore, sample, restore } from 'effector';

import { Langs } from '../lang/lang';

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
];

const getNextId = () => (Math.floor(Math.random() * 1000000));

export const appMounted = createEvent();
export const onAddItem = createEvent();
export const onDeleteItem = createEvent();
export const onToggleImportant = createEvent();
export const onToggleDone = createEvent();
export const onToggleLang = createEvent();
export const onLabelChanged = createEvent();
export const onFilterChange = createEvent();
export const onSearchInput = createEvent();

export const $todoData = createStore(null);
export const $toDo = createStore(0);
export const $done = createStore(0);
export const $search = restore(onSearchInput, '');
export const $filter = restore(onFilterChange, 'all');
export const $newId = createStore(0);
export const $lang = createStore(Langs['en'])
export const $addInput = restore(onLabelChanged, '')

$todoData
  .on(appMounted, () => initData)
  .on(
    sample({
      source: { $newId, $addInput },
      clock: onAddItem,
      fn: ({ $newId, $addInput }, _) => ({
        id: $newId,
        label: $addInput,
        important: false,
        done: false,
      })
    }),
    (state, todo) => ([...state, todo])
  )
  .watch(x => console.log(x, '$todoData'));

$newId
  .on(onAddItem, () => getNextId())
  .watch(x => console.log(x, 'nextId'));

$addInput
  .on(onLabelChanged, (state, text) => text)
  .reset($todoData.updates)
  .watch(x => console.log(x, '$addInput'));

$toDo
.on($todoData.updates, (state, todos) => todos.length)
.watch(x => console.log(x, '$toDo'));

$done
  .on($todoData.updates, (state, todos) =>
    todos.filter(item => item.done).length
  )
  .watch(x => console.log(x, '$done'));
