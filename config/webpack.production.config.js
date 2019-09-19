const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const jsonImporter = require('node-sass-json-importer')
const theme = require('../src/stylesheets/theme.json')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const pack = require('../package.json')

const config = {
  mode: 'production',
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
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
    filename: '[contenthash].js',
    chunkFilename: '[chunkhash].js',
  },
  stats: {
    children: false,
    modules: false,
    chunkModules: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress:false
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendorStyles: {
          name: 'vendorStyles',
          test: /.*(node_modules).*\.s?css$/,
          chunks: 'all',
          priority: 9,
          enforce: true
        },
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: 'initial',
          priority: 8,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /src\/.*\.s?css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.VERSION': JSON.stringify(pack.version)
    }),

    new HtmlWebpackPlugin({
      template: '/app/src/index.ejs',
      color: theme.colors.primary,
      inject: 'body',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),

    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en-gb|en-ca|en-ie|de|fr|ru)$/),

    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
      chunkFilename: '[contenthash].css'
    })
  ],
  module: {
    noParse: [/jszip.js$/],
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        include: [ '/app/src', '/app/test', /camelcase/, /decamelize/ ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        include: [ /material-design-icons/, /antd/, /typeface-roboto/ ]
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:8]'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              importer: jsonImporter()
            }
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
