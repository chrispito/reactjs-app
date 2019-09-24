import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { renderRoutes } from 'react-router-config'

import { hot, setConfig } from 'react-hot-loader'
import routes from '../routes'
import 'custom-style.less'
import 'style.scss'

setConfig({
  reloadHooks: false
})

const Application = ({ store, history }) => (
  <Provider store={store}>
    <>
      <ConnectedRouter
        history={history}
      >
        {renderRoutes(routes)}
      </ConnectedRouter>
    </>
  </Provider>
)

Application.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default hot(module)(Application)
