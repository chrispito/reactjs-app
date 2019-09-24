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
        Your Website
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
          <Typography
            variant="h6"
            align="center"
            gutterBottom
          >
            R-Piano
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            {i18n.get('footer_copy_right')}
          </Typography>
          <Copyright />
        </Container>
      </footer>
    )
  }
}

FooterComp.propTypes = {
  i18n: PropTypes.object.isRequired
}
