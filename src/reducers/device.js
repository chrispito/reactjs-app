/* global navigator */
import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'
import MobileDetect from 'mobile-detect'

import * as Actions from 'actions/environment'

const initialState = fromJS({
  mobile: false,
  tablet: false,
  phone: false
})

const { userAgent } = navigator
const ie = userAgent && (!!userAgent.match(/MSIE/) || !!userAgent.match(/Trident/))

export default handleActions({
  [Actions.changeWidthAndHeight]: (state, { payload: { width, height } }) => {
    const detect = new MobileDetect(navigator.userAgent) // Do not use global variable to reflect changes in DevTool

    return state.merge({
      mobile: !!detect.mobile(),
      tablet: !!detect.tablet(),
      phone: !!detect.phone(),
      ios: detect.os() === 'iOS',
      ie,
      xs: width < 600,
      'gt-xs': width >= 600,
      'lt-sm': width < 600,
      sm: width >= 600 && width < 960,
      'gt-sm': width >= 960,
      'lt-md': width < 960,
      md: width >= 960 && width < 1280,
      'gt-md': width >= 1280,
      'lt-lg': width < 1280,
      lg: width >= 1280 && width < 1920,
      'gt-lg': width >= 1920,
      'lt-xl': width < 1920,
      xl: width >= 1920,
      landscape: width > height
    })
  }
}, initialState)
