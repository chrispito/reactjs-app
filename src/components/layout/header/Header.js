import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Toolbar,
  Typography
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import MusicNoteIcon from '@material-ui/icons/MusicNote'

import theme from './theme.scss'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, value) {
    console.log('event = ', event)
    console.log('value = ', value)
    this.props.onItemClick(value)
  }

  renderLink(pathname, labelKey, icon) {
    const { i18n } = this.props

    return (
      <BottomNavigationAction
        label={i18n.get(labelKey)}
        value={pathname}
        icon={icon}
      />
    )
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            className={theme.title}
          >
            Reactive Piano
          </Typography>
          <BottomNavigation
            showLabels
            value={this.props.currentPath}
            onChange={this.handleChange}
            className={theme.root}
          >
            {this.renderLink('/home', 'home', <HomeIcon />)}
            {this.renderLink('/keys', 'keys', <MusicNoteIcon />)}
          </BottomNavigation>
          <Button>Login</Button>
        </Toolbar>
      </AppBar>
    )
  }
}

Header.propTypes = {
  onItemClick: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  currentPath: PropTypes.string.isRequired
}
