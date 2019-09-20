export const getApp = (state) => state.app
export const getAccessToken = (state) => getApp(state).get('accessToken')
export const getForceReload = (state) => getApp(state).get('forceReload')
