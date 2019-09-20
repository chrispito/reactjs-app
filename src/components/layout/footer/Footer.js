import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import theme from './theme.scss'


export default class FooterComp extends PureComponent {
  render() {
    const { i18n } = this.props
    const { Footer } = Layout

    return (
      <Footer className={theme.content}>
        {i18n.get('footer_copy_right')}
      </Footer>
    )
  }
}

FooterComp.propTypes = {
  i18n: PropTypes.object.isRequired
}
