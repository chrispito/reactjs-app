import { connect } from 'react-redux'

import ForceReload from 'components/force_reload'

import { getI18n } from 'selectors'

const mapStateToProps = state => ({
  i18n: getI18n(state)
})

export default connect(mapStateToProps)(ForceReload)
