/* global document, window */
import React from 'react'
import { render } from 'react-dom'

import store from './store'
import history from './store/configureHistory'
import Application from './containers/Application'

global.mouseX = 0
global.mouseY = 0

window.onmousemove = (e) => {
  try {
    global.mouseX = e.clientX
    global.mouseY = e.clientY
  } catch(e) { // eslint-disable-line
  }
}


render(
  <Application
    store={store}
    history={history}
  />,
  document.getElementById('reactjs-app')
)

if (module.hot) {
  module.hot.accept()
}
