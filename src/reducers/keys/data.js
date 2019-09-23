import { handleActions } from 'redux-actions'
import { fromJS, List } from 'immutable'

import * as Actions from 'actions/app'
import { hexColorFromString } from 'utils/color'


const octaves = [1, 2, 3, 4, 5, 6, 7]
const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const keyList = octaves.reduce((nodes, octaveNumber) => {
  const notesInOctave = tones.map((tone, index) => {
    const position = (12 * (octaveNumber - 1)) + index
    const color = hexColorFromString(`'key'_${tone}_${position}`)

    return {
      key: `${tone}${octaveNumber}`,
      pos: position,
      color
    }
  })
  return nodes.concat(notesInOctave)
}, [])

export const initialState = fromJS({
  keys: fromJS(keyList),
  octaves: new List(octaves),
  tones: new List(tones)
})

export default handleActions({
  [Actions.resetState]: (_state) => initialState
}, initialState)
