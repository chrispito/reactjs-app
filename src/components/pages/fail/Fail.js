import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Fail extends PureComponent {
  render() {
    const { i18n } = this.props

    return (
      <div>
        {i18n.get('fail_message')}
      </div>
    )
  }
}

Fail.propTypes = {
  i18n: PropTypes.object.isRequired
}
