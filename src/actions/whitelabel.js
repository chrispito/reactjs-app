import { createAction } from 'redux-actions'

const prefix = 'WHITELABEL/'

export const whitelabelRequestSuccess = createAction(`${prefix}WHITELABEL_REQUEST_SUCCESS`)
export const whitelabelRequestError = createAction(`${prefix}WHITELABEL_REQUEST_ERROR`)
