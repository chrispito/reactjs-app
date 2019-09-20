/* global window */
const { protocol, host, pathname } = window.location

export const getBaseUrl = () => `${protocol}//${host}${pathname}`.replace(/\/$/, '')
