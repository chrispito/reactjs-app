import { combineReducers } from 'redux'
import { fromJS } from 'immutable'
import { connectRouter } from 'connected-react-router'

import app from './app'
import environment from './environment'
import i18n from './i18n'
import device from './device'

import { logoutRequestSuccess } from '../actions/app'

const appReducer = (history) => combineReducers({
  app,
  device,
  environment,
  i18n,
  router: connectRouter(history)
})

// Pattern inspired by http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (history) => (state, action) => {
  let newState = state

  if (action.type === logoutRequestSuccess().type) {
    // Keep width and height for login page
    newState = {
      environment: state.environment,
      device: state.device
    }
  }

  return appReducer(history)(newState, action)
}

// This root reducer is used to create the store
export default rootReducer
