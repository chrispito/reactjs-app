import React from 'react'

import { hot, setConfig } from 'react-hot-loader'

import theme from './theme.scss'


setConfig({
  reloadHooks: false
})

const Application = () => (
  <div className={theme.content}>
    <h2>About React JS...</h2>
    <p>Hello World!</p>
  </div>
)

export default hot(module)(Application)
