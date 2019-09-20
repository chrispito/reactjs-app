import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import moment from 'moment-timezone'
import keys from 'static/keys.json'

import * as Actions from 'actions/app'
import { hexColorFromString } from 'utils/color'

const timezone = moment.tz.guess() || 'Europe/Berlin'

moment.tz.setDefault(timezone)

const getColoredKeys = () => {
  let result = []
  keys.data.forEach((key) => {
    const value = key
    value.color = hexColorFromString(`'key'_${key.key}_${key.pos}`)
    result.push(value)
  })
  result = fromJS(result)
  return result.sortBy((item) => -item.get('key'))
}

export const initialState = fromJS({
  keys: getColoredKeys()
})

export default handleActions({
  [Actions.resetState]: (_state) => initialState
}, initialState)
