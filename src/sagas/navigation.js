import { put, takeEvery, select, all } from 'redux-saga/effects'

import * as Actions from 'actions/navigation'
import * as Selectors from 'selectors'
import { push, LOCATION_CHANGE } from 'connected-react-router'

export function* navigate({ payload: path }) {
  if (!path.startsWith('/')) {
    const currentPath = yield select(Selectors.getCurrentPath)
    yield put(push(`${currentPath}/${path}`))
  } else {
    yield put(push(`${path}`))
  }
}

export function* back() {
  const currentPath = yield select(Selectors.getCurrentPath)
  const parts = currentPath.split('/').filter((v) => v).map((v) => v.split('?'))

  parts.pop()
  const newPath = `/${parts.map((v) => v.join('')).join('/')}`

  yield put(Actions.navigate(newPath))
}

export function* locationChange({ payload: { location: { pathname } } }) {
  if (pathname === '/') {
    yield put(push('home'))
  }
}

export function* watchNavigate() {
  yield takeEvery(Actions.navigate, navigate)
}

export function* watchBack() {
  yield takeEvery(Actions.back, back)
}

export function* watchLocationChange() {
  yield takeEvery(LOCATION_CHANGE, locationChange)
}

export default function* navigationSaga() {
  yield all([
    watchNavigate(),
    watchBack(),
    watchLocationChange()
  ])
}
