import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { getWhitelabelColors } from 'selectors'

import prTheme from 'stylesheets/theme.json'

export const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: prTheme.colors.primary
    },
    secondary: {
      main: prTheme.colors.accent
    }
  }
})

const cachedThemes = {}
export const createThemeWithColors = (primary, accent) => {
  const cacheKey = `${primary}${accent}`
  const cached = cachedThemes[cacheKey]

  if (cached) {
    return cached
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: primary,
        contrastText: '#fff'
      },
      secondary: {
        main: accent,
        contrastText: '#fff'
      }
    }
  })

  cachedThemes[cacheKey] = theme

  return theme
}

const buildHoc = (colorSelector) => (Comp) => {
  const WrapperComponent = ({ muiPrimary, muiAccent, ...props }) => {
    const theme = createThemeWithColors(muiPrimary, muiAccent)

    const compProps = { ...props }
    delete compProps.dispatch
    /* eslint-disable */
    return (
      <MuiThemeProvider theme={theme}>
        <Comp {...compProps} /> 
      </MuiThemeProvider>
    )
    /* eslint-enable */
  }

  WrapperComponent.propTypes = {
    muiPrimary: PropTypes.string.isRequired,
    muiAccent: PropTypes.string.isRequired
  }

  WrapperComponent.displayName = `WithMuiTheme(${Comp.name})`

  const mapStateToProps = (state) => ({
    muiPrimary: colorSelector(state).get('primary'),
    muiAccent: colorSelector(state).get('accent')
  })

  return connect(mapStateToProps)(WrapperComponent)
}

const WithWhitelabelMuiTheme = buildHoc(getWhitelabelColors)

export default WithWhitelabelMuiTheme
