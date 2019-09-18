const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const jsonImporter = require('node-sass-json-importer')
const theme = require('../src/stylesheets/theme.json')
const apiConfig = require('./api.json')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const pack = require('../package.json')

const config = {
  mode: 'development',
  entry: {
    app: ['@babel/polyfill', '/app/src/index.js']
  },
  resolve: {
    alias: {
      '@material-ui/styles': path.resolve('/app', 'node_modules', '@material-ui/styles'),
    },
    modules: [
      'node_modules',
      '/app/src'
    ]
  },
  output: {
    path: '/app/dist',
    filename: '[name].js',
    chunkFilename: '[name].js',
    pathinfo: true,
    globalObject: 'this'
  },
  plugins: [
    new StyleLintPlugin({
      context: '/app/src',
      syntax: 'scss',
      emitErrors: false,
      fix: true
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VERSION': JSON.stringify(pack.version)
    }),

    new HtmlWebpackPlugin({
      template: '/app/src/index.ejs',
      color: theme.colors.primary,
      inject: 'body',
      chunksSortMode: 'dependency'
    }),

    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: "/app/src/static",
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'minimal',
    disableHostCheck: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000
    },
    host: '0.0.0.0',
    port: 9002,
    proxy: {
      '/api': {
        target: apiConfig.development,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  module: {
    noParse: [/jszip.js/],
    rules: [
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        exclude: /jszip/,
        use: ['react-hot-loader/webpack'],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
              failOnWarning: false,
              failOnError: false,
              fix: true
            }
          }
        ],
        include: [ '/app/src', '/app/test' ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
        include: [ /material-design-icons/, /typeface-roboto/ ]
      },
      {
        test: /\.scss|\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              importLoaders: 1
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          }
        ],
        include: [ '/app/src', /normalize.css/ ]
      },
      {
        test: /\.gif$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/[ext]'
            }
          }
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
