import { combineReducers } from 'redux-immutable'

import ui from './ui'
import data from './data'

export default combineReducers({
  ui,
  data
})
