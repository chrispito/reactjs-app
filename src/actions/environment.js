import { createAction } from 'redux-actions'

const prefix = 'ENVIRONMENT/'

export const initEnvironment = createAction(`${prefix}INIT_ENVIRONMENT`)
export const changeWidthAndHeight = createAction(`${prefix}CHANGE_WIDTH_AND_HEIGHT`)
export const stageRequestSuccess = createAction(`${prefix}STAGE_REQUEST_SUCCESS`)
