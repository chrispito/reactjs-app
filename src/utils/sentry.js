import Raven from 'raven-js'
import { isUnauthorized } from 'utils/error'

export const logException = (exception) => {
  if (!isUnauthorized(exception)) {
    console.error(exception) // eslint-disable-line
    if (exception.request) {
      Raven.captureException(exception, {
        extra: {
          request: exception.request,
          response: exception.response
        }
      })
    } else {
      Raven.captureException(exception)
    }
  }
}

export const setUserContext = (user) => Raven.setUserContext(user)
export const setExtraContext = (data) => Raven.setExtraContext(data)
export const setRelease = (release) => Raven.setRelease(release)
