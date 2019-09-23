import { connect } from 'react-redux'

import Head from 'components/pages/key_page/head'

import { selectOctave, selectTone } from 'actions/keys'
import { getI18n, getTones, getOctaves, getSelectedTone, getSelectedOctave } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state),
  tones: getTones(state),
  octaves: getOctaves(state),
  tone: getSelectedTone(state),
  octave: getSelectedOctave(state)
})

export default connect(mapStateToProps, {
  selectOctave,
  selectTone
})(Head)
