import React from 'react'
import { useStore } from 'effector-react'
import { TextField, makeStyles } from '@material-ui/core'

import {
  $lang,
  onSearchInput,
} from '../app/app.model'

const useStyles = makeStyles({
  input: {
    width: '100%',
    minWidth: '220px',

  }
})

export const SearchPanel = () => {
  const { searchLabel, searchPlaceholder } = useStore($lang)
  const { input } = useStyles()

  return (
    <TextField
      classes={{ root: input }}
      label={searchLabel}
      variant="outlined"
      type="text"
      placeholder={searchPlaceholder}
      onInput={event => onSearchInput(event.target.value)}
    />
  )
}