import { connect } from 'react-redux'

import KeyPage from 'components/pages/key_page'

import { getI18n, getSelectedKeys } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state),
  selectedKey: getSelectedKeys(state)
})

export default connect(mapStateToProps)(KeyPage)
