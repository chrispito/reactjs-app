export const getPathName = (state) => state.router.location.pathname
export const getCurrentPath = (state) => state.router.location.pathname.replace(/\/$/, '')
