import { JSDOM } from 'jsdom'
import expect from 'expect'
import sinon from 'sinon'
import moment from 'moment-timezone'
import FormData from 'form-data'
import 'ignore-styles'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import jest from 'jest-mock'

import {
  setValueTest,
  setValueTests,
  // resetStateTest,
  initialStateTest,
  defaultReducerTests,
  watcherTest,
  watcherTests
} from './helpers'

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}

global.cancelAnimationFrame = (callback) => {
  setTimeout(callback, 0)
}

Enzyme.configure({ adapter: new Adapter() })

process.env.NODE_ENV = 'test'

Function.prototype.ensure = (arr, func) => func(require) // eslint-disable-line

expect.createSpy = () => jest.fn()

moment.locale('en')
moment.tz.setDefault('UTC')
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost', pretendToBeVisual: true })
global.Element = dom.window.Element
global.document = dom.window.document
global.window = dom.window
global.navigator = global.window.navigator
global.expect = expect
global.sinon = sinon
global.shallow = shallow
global.mount = mount
global.FormData = FormData
global.setValueTest = setValueTest
global.setValueTests = setValueTests
// global.resetStateTest = resetStateTest
global.initialStateTest = initialStateTest
global.defaultReducerTests = defaultReducerTests
global.watcherTest = watcherTest
global.watcherTests = watcherTests
