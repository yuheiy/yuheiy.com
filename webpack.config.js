const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: [
      'core-js/modules/es6.promise',
      'whatwg-fetch',
      './src/js/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src/js'),
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'document-promises': 'document-promises/document-promises.js',
      'vue': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    ...(isDev ? [] : [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true,
        },
        compress: {
          screw_ie8: true,
        },
        comments: false,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
    ]),
  ],
  devtool: isDev && 'source-map',
}
