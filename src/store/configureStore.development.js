/* global window */
import { compose, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'reducers/index'
import rootSaga from 'sagas'
import { trackExceptions, trackActions, loadingIndicator } from 'utils/middlewares'
import { routerMiddleware } from 'connected-react-router'
import * as ConfigActions from 'actions/config'

import history from './configureHistory'

const sagaMiddleware = createSagaMiddleware()

const autherActions = [
  ConfigActions.setStatics
]

const big = '<<BIG>>'

const actionSanitizer = (action) => {
  if (autherActions.find((e) => e.toString() === action.type)) {
    return { ...action, payload: big }
  }

  return action
}

const stateSanitizer = (state) => (state)

export default function configureStore(initialState = {}) {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ // eslint-disable-line
    actionSanitizer,
    stateSanitizer
  })
  const middlewares = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
    trackExceptions,
    trackActions,
    loadingIndicator
  )

  let enhancer = compose(middlewares)

  if (devTools) {
    enhancer = compose(middlewares, devTools)
  }

  const store = createStore(
    rootReducer(history),
    initialState,
    enhancer
  )

  /* eslint-disable */
  let sagaTask = sagaMiddleware.run(function* () {
    yield rootSaga()
  })
  /* eslint-enable */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      /* eslint-disable */
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer(history))
      /* eslint-enable */
    })

    module.hot.accept('../sagas', () => {
      /* eslint-disable */
      const getNewSagas = require('../sagas').default
      sagaTask.cancel()
      sagaTask.toPromise().then(() => {
        sagaTask = sagaMiddleware.run(function* replacedSaga(action) {
          yield getNewSagas()
        })
      })
      /* eslint-enable */
    })
  }

  return store
}
