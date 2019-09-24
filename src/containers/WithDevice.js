import { connect } from 'react-redux'

import { getDevice, getBreakpoint } from 'selectors'

const mapStateToProps = (state, { breakpoint }) => ({
  device: getDevice(state),
  breakpoint: breakpoint || getBreakpoint(state)
})

const extraOptions = {
  getDisplayName: name => `WithDevice(${name})`
}

export default function WithDevice() {
  return Comp => connect(mapStateToProps, null, null, extraOptions)(Comp)
}
