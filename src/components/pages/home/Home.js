import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import theme from './theme.scss'


export default class Home extends PureComponent {
  render() {
    const { i18n } = this.props

    return (
      <Row gutter={16}>
        <Col
          span={24}
          className={theme.content}
        >
          {i18n.get('wellcome')}
        </Col>
      </Row>
    )
  }
}

Home.propTypes = {
  i18n: PropTypes.object.isRequired
}
