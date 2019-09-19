/* global window */
import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import moment from 'moment-timezone'
import { parse } from 'query-string-es5'

import { readCookie } from 'utils/cookieHelper'

import * as Actions from 'actions/app'

const timezone = moment.tz.guess() || 'Europe/Berlin'

moment.tz.setDefault(timezone)

const nid = parseInt(parse(window.location.hash.split('?')[1] || '').nid, 10)

export const initialState = fromJS({
  bffVersion: null,
  viewVersion: null,
  forceReload: false,
  activeNewsradarId: nid || parseInt(readCookie('groot_newsradar'), 10) || null,
  appIsReady: false,
  loginMsg: '',
  loginError: false,
  snackbarText: '',
  showNavigation: false,
  showUndo: false,
  loading: false,
  appBarMessage: null,
  appMessage: null,
  success: false,
  showAppMessage: false,
  timezone
})

export default handleActions({
  [Actions.loginRequestSuccess]: state => state.set('loginMsg', '').set('loginError', false),
  [Actions.setLoginMessage]: (state, { payload: { loginMsg, loginError } }) => state
    .set('loginMsg', loginMsg)
    .set('loginError', loginError),
  [Actions.loginRequestError]: (state, { payload: msg }) => state.set('loginMsg', msg).set('loginError', true),
  [Actions.loginRequestAborted]: (state, { payload: msg }) => state.set('loginMsg', msg).set('loginError', true),
  [Actions.logoutRequestSuccess]: state => initialState.set('activeNewsradarId', state.get('activeNewsradarId')),
  [Actions.setActiveNewsradar]: (state, { payload: newsradarId }) => state.set('activeNewsradarId', newsradarId),
  [Actions.setAppBarMessage]: (state, { payload: message }) => state.set('appBarMessage', message),
  [Actions.setAppMessage]: (state, { payload: message }) => state.set('appMessage', message),
  [Actions.setAppReady]: state => state.set('appIsReady', true),
  [Actions.setAppBusy]: state => state.set('appIsReady', false),
  [Actions.toggleNavigation]: state => state.set('showNavigation', !state.get('showNavigation')),
  [Actions.showUndo]: state => state.set('showUndo', true),
  [Actions.hideUndo]: state => state.set('showUndo', false),
  [Actions.toggleLoading]: (state, { payload }) => {
    if (payload === undefined) {
      return state.update('loading', loading => !loading)
    }

    return state.set('loading', payload)
  },
  [Actions.setBffVersion]: (state, { payload: bffVersion }) => state.set('bffVersion', bffVersion),
  [Actions.setViewVersion]: (state, { payload: viewVersion }) => state.set('viewVersion', viewVersion),
  [Actions.forceReload]: state => state.set('forceReload', true),
  [Actions.toggleSuccess]: (state, { payload }) => state.update('success', success => (payload !== undefined ? payload : !success)),
  [Actions.toggleAppMessage]: (state, { payload }) => (
    state.update('showAppMessage', success => (payload !== undefined ? payload : !success))
  ),

  [Actions.resetState]: state => state.set('showNavigation', false)
}, initialState)
