import { connect } from 'react-redux'

import Main from 'components/main'
import { initEnvironment } from 'actions/environment'
import { getEnvironment, getForceReload } from 'selectors'

const mapStateToProps = (state) => ({
  environmentIsLoaded: getEnvironment(state).get('environmentIsLoaded'),
  forceReload: getForceReload(state)
})

export default connect(
  mapStateToProps,
  {
    initEnvironment
  }
)(Main)
