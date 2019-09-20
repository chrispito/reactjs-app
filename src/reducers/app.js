import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import moment from 'moment-timezone'

import * as Actions from 'actions/app'

const timezone = moment.tz.guess() || 'Europe/Berlin'

moment.tz.setDefault(timezone)

export const initialState = fromJS({
  apiVersion: null,
  accessToken: null,
  viewVersion: null,
  forceReload: false,
  appIsReady: false,
  loginMsg: '',
  loginError: false,
  snackbarText: '',
  showUndo: false,
  loading: false,
  appBarMessage: null,
  appMessage: null,
  success: false,
  showAppMessage: false,
  timezone
})

export default handleActions({
  [Actions.loginRequestSuccess]: (state) => state.set('loginMsg', '').set('loginError', false),
  [Actions.setLoginMessage]: (state, { payload: { loginMsg, loginError } }) => state
    .set('loginMsg', loginMsg)
    .set('loginError', loginError),
  [Actions.loginRequestError]: (state, { payload: msg }) => state.set('loginMsg', msg).set('loginError', true),
  [Actions.loginRequestAborted]: (state, { payload: msg }) => state.set('loginMsg', msg).set('loginError', true),
  [Actions.setAppBarMessage]: (state, { payload: message }) => state.set('appBarMessage', message),
  [Actions.setAppMessage]: (state, { payload: message }) => state.set('appMessage', message),
  [Actions.setAppReady]: (state) => state.set('appIsReady', true),
  [Actions.setAppBusy]: (state) => state.set('appIsReady', false),
  [Actions.showUndo]: (state) => state.set('showUndo', true),
  [Actions.hideUndo]: (state) => state.set('showUndo', false),
  [Actions.toggleLoading]: (state, { payload }) => {
    if (payload === undefined) {
      return state.update('loading', (loading) => !loading)
    }

    return state.set('loading', payload)
  },
  [Actions.setApiVersion]: (state, { payload: apiVersion }) => state.set('apiVersion', apiVersion),
  [Actions.setViewVersion]: (state, { payload: viewVersion }) => state.set('viewVersion', viewVersion),
  [Actions.forceReload]: (state) => state.set('forceReload', true),
  [Actions.toggleSuccess]: (state, { payload }) => state.update('success', (success) => (payload !== undefined ? payload : !success)),
  [Actions.toggleAppMessage]: (state, { payload }) => (
    state.update('showAppMessage', (success) => (payload !== undefined ? payload : !success))
  ),

  [Actions.resetState]: (_state) => initialState
}, initialState)
