import { createAction } from 'redux-actions'

const prefix = 'KEYS/'

export const resetState = createAction(`${prefix}RESET_STATE`)
export const selectOctave = createAction(`${prefix}SELECT_OCTAVE`)
export const selectTone = createAction(`${prefix}SELECT_TONE`)
