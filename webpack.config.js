const path = require('path');
var webpack = require('webpack');

var plugins = []; // if using any plugins for both dev and production
var devPlugins = []; // if using any plugins for development

var prodPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
];

plugins = plugins.concat(process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins);

module.exports = {
  context: __dirname,
  entry: './frontend/slack.jsx',
  output: {
    filename: './app/assets/javascripts/bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: [/\.(png|jpg)$/],
        loader: 'url-loader'
      },
      {
        test: /plugin\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-maps'
};
