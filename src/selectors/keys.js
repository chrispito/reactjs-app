export const getState = (state) => state.keys
export const getDataState = (state) => state.keys.get('data')
export const getUIState = (state) => state.keys.get('ui')

export const getKeys = (state) => getDataState(state).get('keys')
export const getTones = (state) => getDataState(state).get('tones')
export const getOctaves = (state) => getDataState(state).get('octaves')

export const getSelectedTone = (state) => getUIState(state).get('tone')
export const getSelectedOctave = (state) => getUIState(state).get('octave')


export const getSelectedKeys = (state) => {
  const tone = getSelectedTone(state)
  const octave = getSelectedOctave(state)

  return getKeys(state).filter((key) => key.get('key') === `${tone}${octave}`).first()
}
