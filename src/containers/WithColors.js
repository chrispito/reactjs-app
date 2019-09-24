import { connect } from 'react-redux'

import { getColors } from 'selectors'

const mapStateToProps = state => ({
  primaryColor: getColors(state).get('primary'),
  accentColor: getColors(state).get('accent')
})

const extraOptions = {
  getDisplayName: name => `WithColors(${name})`
}

export default function WithColors() {
  return Comp => connect(mapStateToProps, null, null, extraOptions)(Comp)
}
