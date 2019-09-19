import { createAction } from 'redux-actions'

const prefix = 'CONFIG/'

export const setStatics = createAction(`${prefix}SET_STATICS`)
export const setLanguage = createAction(`${prefix}SET_LANGUAGE`)
