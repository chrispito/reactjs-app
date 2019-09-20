import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { Layout, Menu } from 'antd/lib'

import theme from './theme.scss'


export default class HeaderComp extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(pathname) {
    const { onItemClick } = this.props
    onItemClick(pathname)
  }

  renderLink(pathname, labelKey, icon) {
    const { i18n } = this.props

    return (
      <Menu.Item
        key={labelKey}
        onClick={() => this.onClick(pathname)}
      >
        <Icon type={icon} />
        {i18n.get(labelKey)}
      </Menu.Item>
    )
  }

  render() {
    const { Header } = Layout

    return (
      <Header className={theme.header}>
        <div className="logo">
          Reactive Piano
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className={theme.menu}
        >
          {this.renderLink('/home', 'home', 'home')}
          {this.renderLink('/keys', 'keys', 'project')}
        </Menu>
      </Header>
    )
  }
}

HeaderComp.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired
}
