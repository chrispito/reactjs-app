export const getEnvironment = state => state.environment
export const getStage = state => getEnvironment(state).get('stage')
export const getWidth = state => getEnvironment(state).get('width')
export const getHeight = state => getEnvironment(state).get('height')
