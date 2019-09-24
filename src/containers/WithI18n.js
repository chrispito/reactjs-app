import { connect } from 'react-redux'

import { getI18n } from 'selectors'

const mapStateToProps = state => ({
  i18n: getI18n(state)
})

const extraOptions = {
  getDisplayName: name => `WithI18n(${name})`
}

export default function WithI18n() {
  return Comp => connect(mapStateToProps, null, null, extraOptions)(Comp)
}
