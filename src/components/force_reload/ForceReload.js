/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'


const maxSeconds = 60

export default class ForceReload extends Component {
  constructor(props) {
    super(props)

    this.state = {
      seconds: 0
    }
  }

  componentDidMount() {
    const self = this

    setInterval(() => {
      const { seconds } = self.state

      self.setState({
        seconds: seconds + 1
      })
    }, 1000)
  }

  reload() {
    window.location.reload()
  }

  render() {
    const { i18n } = this.props
    const { seconds } = this.state
    const deadline = Date.now() + 1000 * 60 * maxSeconds

    if (seconds >= maxSeconds) {
      this.reload()
    }

    return (
      <div>
        {i18n.get('force_reload_title')}
        {deadline}
      </div>
    )
  }
}

ForceReload.propTypes = {
  i18n: PropTypes.object.isRequired
}
