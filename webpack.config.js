const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    app: './src/js/index.js'
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
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
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
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
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
