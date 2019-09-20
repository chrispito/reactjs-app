import { all } from 'redux-saga/effects'

import environmentSaga from './environment'
import navigationSaga from './navigation'

export default function* rootSaga() {
  yield all([
    environmentSaga(),
    navigationSaga()
  ])
}
