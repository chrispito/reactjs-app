import { all } from 'redux-saga/effects'

import configSaga from './config'
import environmentSaga from './environment'

export default function* rootSaga() {
  yield all([
    environmentSaga(),
    configSaga()
  ])
}
