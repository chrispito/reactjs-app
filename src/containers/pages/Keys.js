import { connect } from 'react-redux'

import Keys from 'components/pages/keys'

import { getI18n, getKeys } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state),
  keys: getKeys(state)
})

export default connect(mapStateToProps)(Keys)
