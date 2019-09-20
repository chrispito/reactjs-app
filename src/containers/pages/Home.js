import { connect } from 'react-redux'

import Home from 'components/pages/home'

import { getI18n } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state)
})

export default connect(mapStateToProps)(Home)
