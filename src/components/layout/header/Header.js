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
import SettingsIcon from '@material-ui/icons/Settings'

import theme from './theme.scss'


export default class Header extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, value) {
    this.props.onItemClick(value)
  }

  renderLink(pathname, labelKey, icon) {
    const { i18n } = this.props

    return (
      <BottomNavigationAction
        classes={{ root: theme.root, selected: theme.selected }}
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
          <div className={theme.menuContainer}>
            <BottomNavigation
              showLabels
              value={this.props.currentPath}
              onChange={this.handleChange}
              className={theme.navBtnContainer}
            >
              {this.renderLink('/home', 'home', <HomeIcon />)}
              {this.renderLink('/keys', 'keys', <MusicNoteIcon />)}
            </BottomNavigation>
            <Button><SettingsIcon /></Button>
          </div>
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
