import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import app from './app'
import environment from './environment'
import keys from './keys'
import i18n from './i18n'
import device from './device'

const appReducer = (history) => combineReducers({
  app,
  device,
  environment,
  i18n,
  keys,
  router: connectRouter(history)
})

// Pattern inspired by http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
const rootReducer = (history) => (state, action) => {
  const newState = state

  return appReducer(history)(newState, action)
}

// This root reducer is used to create the store
export default rootReducer
