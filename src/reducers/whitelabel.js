import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import * as Actions from 'actions/whitelabel'

import masterConfig from 'static/master_config'

import apiConfig from '../../config/api.json'

const initialState = fromJS({
  title: 'React Piano',
  colors: {
    primary: masterConfig.getIn(['theme', 'colors', 'primary']),
    accent: masterConfig.getIn(['theme', 'colors', 'accent'])
  },
  apiUrl: apiConfig
})

export default handleActions({
  [Actions.whitelabelRequestSuccess]: (state, { payload }) => state.mergeDeep(fromJS(payload))
}, initialState)
