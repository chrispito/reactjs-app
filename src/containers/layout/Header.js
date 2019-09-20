import { connect } from 'react-redux'

import Header from 'components/layout/header'
import { navigate } from 'actions/navigation'
import { getI18n, getCurrentPath } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state),
  currentPath: getCurrentPath(state)
})

export default connect(mapStateToProps, {
  onItemClick: navigate
})(Header)
