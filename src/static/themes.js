import masterConfig from './master_config'

const primaryColor = masterConfig.getIn(['theme', 'colors', 'primary'])
const accentColor = masterConfig.getIn(['theme', 'colors', 'accent'])

export default [
  {
    name: 'Main',
    colors: {
      primary: primaryColor,
      accent: accentColor
    }
  }
]
