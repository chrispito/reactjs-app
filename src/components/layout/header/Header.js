import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Layout, Menu } from 'antd/lib'

import theme from './theme.scss'


export default class HeaderComp extends Component {
  onClick(pathname) {
    const { onItemClick } = this.props
    onItemClick(pathname)
  }

  renderLink(key, pathname, labelKey, icon) {
    const { i18n } = this.props

    return (
      <Menu.Item
        key={key}
        onClick={this.onClick.bind(this, pathname)}
      >
        <Icon type={icon} />
        {i18n.get(labelKey)}
      </Menu.Item>
    )
  }

  render() {
    const { Header } = Layout

    return (
      <Header>
        <div className={theme.logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className={theme.menu}
        >
          {this.renderLink('1', '/home', 'home', 'home')}
        </Menu>
      </Header>
    )
  }
}

HeaderComp.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
}
