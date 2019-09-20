import { connect } from 'react-redux'

import Footer from 'components/layout/footer'

import { getI18n } from 'selectors'

const mapStateToProps = (state) => ({
  i18n: getI18n(state)
})

export default connect(mapStateToProps)(Footer)
