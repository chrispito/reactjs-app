import { createAction } from 'redux-actions'

const prefix = 'NAVIGATION/'

export const navigate = createAction(`${prefix}NAVIGATE`)
export const back = createAction(`${prefix}BACK`)
