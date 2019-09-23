import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import * as Actions from 'actions/keys'


export const initialState = fromJS({
  tone: 'C',
  octave: 4
})

export default handleActions({
  [Actions.selectOctave]: (state, { payload }) => state.merge(
    { octave: payload }
  ),
  [Actions.selectTone]: (state, { payload }) => state.merge(
    { tone: payload }
  ),
  [Actions.resetState]: (_state) => initialState
}, initialState)
