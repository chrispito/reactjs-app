module.exports = {
  plugins: {
    'postcss-import': {
      root: __dirname
    },
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions']
    },
    'cssnano': {
      preset: 'default'
    }
  }
}
