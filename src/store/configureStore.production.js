import { compose, createStore, applyMiddleware } from 'redux'
import Raven from 'raven-js'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'

import { logException } from 'utils/sentry'
import rootReducer from 'reducers/index'
import rootSaga from 'sagas'
import { trackExceptions, trackActions, loadingIndicator } from 'utils/middlewares'
import history from './configureHistory'

Raven.config('https://50ef5e06dbdb4656bb9e1df1c0dd6c50@sentry.io/235442').install()
Raven.setTagsContext({
  environment: 'production'
})

const sagaMiddleware = createSagaMiddleware({
  onError: logException
})

export default function configureStore(initialState = {}) {
  const enhancer = compose(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
      trackExceptions,
      trackActions,
      loadingIndicator
    )
  )

  const store = createStore(
    rootReducer(history),
    initialState,
    enhancer
  )

  sagaMiddleware.run(rootSaga)

  return store
}
