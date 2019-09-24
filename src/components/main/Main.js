import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import CssBaseline from '@material-ui/core/CssBaseline'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

import ForceReload from 'containers/ForceReload'
import Footer from 'containers/layout/Footer'
import Header from 'containers/layout/Header'
import WithWhitelabelMuiTheme from 'containers/WithMuiTheme'

const generateClassName = createGenerateClassName({
  productionPrefix: 'rpiano',
  disableGlobal: true
})


function MainComp({ initEnvironment, environmentIsLoaded, route, forceReload }) {
  useEffect(() => {
    initEnvironment()
  }, [])

  let reloadComp
  if (forceReload) {
    reloadComp = <ForceReload />
  }

  let body
  if (environmentIsLoaded) {
    body = (
      <>
        <CssBaseline />
        <Header />
        {renderRoutes(route.routes)}
        <Footer />
      </>
    )
  }

  if (!body) {
    return null
  }

  return (
    <>
      {reloadComp}
      {body}
    </>
  )
}

MainComp.propTypes = {
  environmentIsLoaded: PropTypes.bool.isRequired,
  initEnvironment: PropTypes.func.isRequired,
  forceReload: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired
}

const StyledMain = WithWhitelabelMuiTheme(MainComp)

export default function Main(props) {
  /* eslint-disable */
  return (
    <StylesProvider
      generateClassName={generateClassName}
      injectFirst
    >
      <StyledMain {...props} />
    </StylesProvider>
  )
  /* eslint-enable */
}
