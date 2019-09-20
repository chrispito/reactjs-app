import { connect } from 'react-redux'

import Fail from 'components/pages/fail'

import { getI18n } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state)
})

export default connect(mapStateToProps)(Fail)
