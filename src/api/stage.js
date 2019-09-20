import * as Api from '../utils/api'

export default () => Api.doJsonRequest(
  'GET',
  'stage.json',
  Api.jsonHeaders,
  {},
  false
)
