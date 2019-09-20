import { createAction } from 'redux-actions'

const prefix = 'APP/'

export const checkApiVersion = createAction(`${prefix}CHECK_API_VERSION`)
export const setApiVersion = createAction(`${prefix}SET_API_VERSION`)
export const forceReload = createAction(`${prefix}FORCE_RELOAD`)
export const toggleLoading = createAction(`${prefix}TOGGLE_LOADING`)
export const checkViewVersion = createAction(`${prefix}CHECK_VIEW_VERSION`)
export const setViewVersion = createAction(`${prefix}SET_VIEW_VERSION`)

export const genericErrorMessage = createAction(`${prefix}GENERIC_ERROR_MESSAGE`)
export const genericSuccessMessage = createAction(`${prefix}GENERIC_SUCCESS_MESSAGE`)
export const hideUndo = createAction(`${prefix}HIDE_UNDO`)
export const loginRequestAborted = createAction(`${prefix}LOGIN_REQUEST_ABORTED`)
export const loginRequestError = createAction(`${prefix}LOGIN_REQUEST_ERROR`)
export const loginRequestStart = createAction(`${prefix}LOGIN_REQUEST_START`)
export const loginRequestSuccess = createAction(`${prefix}LOGIN_REQUEST_SUCCESS`)
export const logoutRequestError = createAction(`${prefix}LOGOUT_REQUEST_ERROR`)
export const logoutRequestStart = createAction(`${prefix}LOGOUT_REQUEST_START`)
export const logoutRequestSuccess = createAction(`${prefix}LOGOUT_REQUEST_SUCCESS`)
export const resetState = createAction(`${prefix}RESET_STATE`)
export const setAppBarMessage = createAction(`${prefix}SET_APP_BAR_MESSAGE`)
export const setAppMessage = createAction(`${prefix}SET_APP_MESSAGE`)
export const setAppBusy = createAction(`${prefix}SET_APP_BUSY`)
export const setAppReady = createAction(`${prefix}SET_APP_READY`)
export const setLoginMessage = createAction(`${prefix}SET_LOGIN_MESSAGE`)
export const showAppMessage = createAction(`${prefix}SHOW_APP_MESSAGE`)
export const showUndo = createAction(`${prefix}SHOW_UNDO`)
export const switchNewsradar = createAction(`${prefix}SWITCH_NEWSRADAR`)
export const undo = createAction(`${prefix}UNDO`)


export const loadFromLocalStorage = createAction(`${prefix}LOAD_FROM_LOCAL_STORAGE`)

export const toggleSuccess = createAction(`${prefix}TOGGLE_SUCCESS`)
export const toggleAppMessage = createAction(`${prefix}TOGGLE_APP_MESSAGE`)

export const exception = createAction(`${prefix}EXCEPTION`)
