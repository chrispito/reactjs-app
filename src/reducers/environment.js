import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import * as Actions from '../actions/environment'

const initialState = fromJS({
  width: null,
  height: null,
  stage: 'development',
  environmentIsLoaded: false
})

export default handleActions({
  [Actions.changeWidthAndHeight]: (state, action) => state.merge({
    width: action.payload.width,
    height: action.payload.height
  }),
  [Actions.stageRequestSuccess]: (state, action) => state.merge({
    stage: action.payload,
    environmentIsLoaded: true
  })
}, initialState)
