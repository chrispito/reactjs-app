/* global document, window */
import React from 'react'
import { render } from 'react-dom'

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
  <Application />,
  document.getElementById('reactjs-app')
)

if (module.hot) {
  module.hot.accept()
}
