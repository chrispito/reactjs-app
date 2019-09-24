/* global window */
import { call, put, takeEvery, all } from 'redux-saga/effects'

import * as Actions from 'actions/environment'
import { whitelabelRequestSuccess } from 'actions/whitelabel'
import getStage from 'api/stage'

export function* initEnvironment() {
  try {
    const config = {
      colors: {
        primary: '#383542',
        accent: '#dabc3a'
      }
    }
    yield put(whitelabelRequestSuccess(config))
  } catch (e) { // eslint-disable-line
  }

  yield put(Actions.changeWidthAndHeight({
    width: window.innerWidth,
    height: window.innerHeight
  }))

  try {
    const { stage } = yield call(getStage)
    yield put(Actions.stageRequestSuccess(stage))
  } catch (e) { // eslint-disable-line
    yield put(Actions.stageRequestSuccess('staging'))
  }
}

export function* watchInitEnvironment() {
  yield takeEvery(Actions.initEnvironment, initEnvironment)
}

export default function* environmentSaga() {
  yield all([
    watchInitEnvironment()
  ])
}
