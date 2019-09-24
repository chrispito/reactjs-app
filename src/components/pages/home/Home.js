import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Container, Typography } from '@material-ui/core'

// import theme from './theme.scss'


export default class Home extends PureComponent {
  render() {
    const { i18n } = this.props

    return (
      <Container gutter={16}>
        <Typography>
          {i18n.get('wellcome')}
        </Typography>
      </Container>
    )
  }
}

Home.propTypes = {
  i18n: PropTypes.object.isRequired
}
