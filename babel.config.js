module.exports = function(api) {
  api.cache(true)

  return {
    env: {
      production: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions', 'ie >= 11']
              }
            }
          ],
          '@babel/preset-react'
        ]
      },
      development: {
        plugins: [
          'react-hot-loader/babel'
        ],
      },
      test: {
        plugins: [
          'dynamic-import-node',
          'istanbul'
        ],
      }
    },
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'recharts',
      'babel-plugin-redux-saga'
    ],
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ]
  }
}
