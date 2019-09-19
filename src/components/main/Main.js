import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/fr_FR';

import ForceReload from 'containers/ForceReload'


const MainComp = ({ initEnvironment, environmentIsLoaded, route, forceReload }) => {
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
      <Fragment>
        {renderRoutes(route.routes)}
      </Fragment>
    )
  }

  if (!body) {
    return null
  }

  return (
    <Fragment>
      {reloadComp}
      {body}
    </Fragment>
  )
}

MainComp.propTypes = {
  environmentIsLoaded: PropTypes.bool.isRequired,
  initEnvironment: PropTypes.func.isRequired,
  forceReload: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired
}

export default function Main(props) {
  return (
    <ConfigProvider locale={frFR}>
      <MainComp />
    </ConfigProvider>
  )
}
