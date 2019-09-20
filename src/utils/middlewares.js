import { toggleLoading } from 'actions/app'

export const trackExceptions = (_store) => (next) => (action) => {
  try {
    return next(action)
  } catch (error) {
    if (!error.response || (error.response && error.response.statusCode !== 401)) {
      console.error('Error....')
    }
    throw error
  }
}

export const trackActions = (_store) => (next) => (action) => {
  try {
    const category = 'AUTO_TRACKING'
    const act = action.type
    const parts = action.type.split('/')

    console.log('User-Actions: ', {
      cat: category,
      act,
      parts
    })
  } catch (error) { // eslint-disable-line no-empty
  }

  return next(action)
}

export const loadingIndicator = (store) => (next) => (action) => {
  if (action.meta && action.meta.indicator !== undefined) {
    store.dispatch(toggleLoading(action.meta.indicator))
  }

  return next(action)
}
