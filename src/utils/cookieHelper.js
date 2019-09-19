import Cookies from 'js-cookie'
import moment from 'moment-timezone'

export function saveCookie(name, value, expires) {
  Cookies.set(name, value, { path: '/', expires: expires || moment().add(719, 'hours').toDate() })
}

export function deleteCookie(name) {
  Cookies.remove(name, { path: '/' })
}

export function readCookie(name) {
  return Cookies.get(name)
}

export function deleteAllCookies() {
  deleteCookie('groot_newsradar')
  deleteCookie('groot_session')
  deleteCookie('groot_access_token')
}

export function deleteSessionCookie() {
  deleteCookie('groot_session')
  deleteCookie('groot_access_token')
}
