/* global window */
const { protocol, host, pathname } = window.location

export const getWhiteLabelConfig = (state) => state.whitelabel
export const getWhitelabelColors = (state) => getWhiteLabelConfig(state).get('colors')

export const getBaseUrl = () => `${protocol}//${host}${pathname}`.replace(/\/$/, '')
