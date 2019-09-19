export const getApp = state => state.app
export const getForceReload = state => getApp(state).get('forceReload')
