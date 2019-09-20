import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import { ConfigProvider, Layout } from 'antd'
import frFR from 'antd/es/locale/fr_FR'

import ForceReload from 'containers/ForceReload'
import Footer from 'containers/layout/Footer'
import Header from 'containers/layout/Header'

import theme from './theme.scss'


export default function Main({ initEnvironment, environmentIsLoaded, route, forceReload }) {
  useEffect(() => {
    initEnvironment()
  }, [])

  const { Content } = Layout
  let reloadComp
  if (forceReload) {
    reloadComp = <ForceReload />
  }

  let body
  if (environmentIsLoaded) {
    body = (
      <Layout className={theme.layout}>
        <Header />
        <Content>
          {renderRoutes(route.routes)}
        </Content>
        <Footer />
      </Layout>
    )
  }

  if (!body) {
    return null
  }

  return (
    <ConfigProvider locale={frFR}>
      {reloadComp}
      {body}
    </ConfigProvider>
  )
}

Main.propTypes = {
  environmentIsLoaded: PropTypes.bool.isRequired,
  initEnvironment: PropTypes.func.isRequired,
  forceReload: PropTypes.bool.isRequired,
  route: PropTypes.object.isRequired
}
