import fetch from 'cross-fetch'
import { checkApiVersion } from 'actions/app'
import camelcaseKeysDeep from 'camelcase-keys-deep'
import { getBaseUrl, getAccessToken } from 'selectors'
import store from '../store'

const maxRetries = 3

const buildError = (request, response, stackTrace) => {
  let error = new Error(`Fetch error ${request.method} ${request.url}: Network failure`)
  if (response) {
    error = new Error(`Fetch error for ${request.method} ${request.url}: ${response.status} (${response.statusText})`)
  }

  if (response) {
    const responseHeaders = {}
    response.headers.forEach((value, name) => {
      responseHeaders[name] = value
    })

    error.response = {
      statusCode: response.status,
      headers: responseHeaders
    }
  }

  if (stackTrace) {
    error.stack = stackTrace
  }

  error.request = request

  return error
}

const retryRequest = (request, response, stackTrace) => {
  if ((request.config.retries || 0) < maxRetries) {
    return new Promise((resolve) => {
      const newConfig = { ...request.config, retries: (request.config.retries || 0) + 1 }
      setTimeout(() => resolve(doRequest(request.method, request.url, request.headers, newConfig, request.addAuthHeaders)), 5000) // eslint-disable-line
    })
  }

  throw buildError(request, response, stackTrace)
}

const networkError = (request) => (error) => retryRequest(request, null, error.stack)

const checkStatus = (request, stackTrace) => (response) => {
  const apiVersion = response.headers.get('x-api-version')

  if (apiVersion) {
    store.dispatch(checkApiVersion(apiVersion))
  }

  if (response.status >= 200 && response.status < 300) {
    return response
  }

  if (response.status === 502 && (request.config.retries || 0) <= maxRetries) {
    return retryRequest(request, response, stackTrace)
  }

  throw buildError(request, response, stackTrace)
}

const parseJSON = (response) => response.json()
const parseBlob = (response) => response.blob()
export const camelize = (response) => camelcaseKeysDeep(response)

export const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export const defaultHeaders = { ...jsonHeaders, 'x-base-url': getBaseUrl(), 'x-response-case': 'camelcase' }

export const formHeaders = {
  Accept: 'application/json'
}

export const doRequest = (method, url, headers = defaultHeaders, config = {}, addAuthHeaders = true) => {
  const stackTrace = (new Error()).stack
  const state = store.getState()
  const newHeaders = { ...headers }

  if (addAuthHeaders) {
    const accessToken = getAccessToken(state)
    if (accessToken) {
      newHeaders['x-access-token'] = accessToken
    }
  }

  const request = {
    url,
    method,
    headers: newHeaders,
    config,
    addAuthHeaders
  }

  return fetch(
    url, { ...config, method, headers: newHeaders }
  )
    .then(checkStatus(request, stackTrace), networkError(request))
}

export const doJsonRequest = (method, url, headers = defaultHeaders, config = {}, addAuthHeaders = true) => (
  doRequest(method, url, headers, config, addAuthHeaders)
    .then(parseJSON)
)

export const doBlobRequest = (method, url, headers = defaultHeaders, config = {}, addAuthHeaders = true) => (
  doRequest(method, url, headers, config, addAuthHeaders)
    .then(parseBlob)
)

export const get = (url) => doJsonRequest('GET', url, defaultHeaders)

export const post = (url, body, accept = 'json') => {
  if (accept === 'json') {
    return doJsonRequest('POST', url, defaultHeaders, {
      body: JSON.stringify(body)
    })
  }

  if (accept === 'blob') {
    return doBlobRequest('POST', url, defaultHeaders, {
      body: JSON.stringify(body)
    })
  }

  return doRequest('POST', url, defaultHeaders, {
    body: JSON.stringify(body)
  })
}

export const patch = (url, body) => doJsonRequest('POST', url, defaultHeaders, {
  body: JSON.stringify({ ...(body || {}), _method: 'PATCH' })
})

const deleteConfig = { body: JSON.stringify({ _method: 'DELETE' }) }
export const destroy = (url) => doJsonRequest('POST', url, defaultHeaders, deleteConfig)

export const form = (url, formData) => doJsonRequest('POST', url, formHeaders, {
  body: formData
})
