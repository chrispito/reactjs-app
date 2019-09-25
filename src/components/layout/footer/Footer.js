import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Typography, Link } from '@material-ui/core'

import theme from './theme.scss'


function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://material-ui.com/"
      >
        R-Piano
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
export default class FooterComp extends PureComponent {
  render() {
    const { i18n } = this.props

    return (
      <footer className={theme.footer}>
        <Container maxWidth="lg">
          <Copyright />
        </Container>
      </footer>
    )
  }
}

FooterComp.propTypes = {
  i18n: PropTypes.object.isRequired
}
