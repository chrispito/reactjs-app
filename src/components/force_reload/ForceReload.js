/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Statistic, Row, Col } from 'antd'


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
    const { Countdown } = Statistic
    const deadline = Date.now() + 1000 * 60 * maxSeconds

    if (seconds >= maxSeconds) {
      this.reload()
    }

    return (
      <div>
        <Row gutter={16}>
          <Col span={24}>
            <Countdown
              title="Countdown"
              value={deadline}
              onFinish={this.reload}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            {i18n.get('force_reload_title')}
          </Col>
        </Row>
      </div>
    )
  }
}

ForceReload.propTypes = {
  i18n: PropTypes.object.isRequired
}
