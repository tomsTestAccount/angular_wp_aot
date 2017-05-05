var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

   module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      }
    ]
  },
  
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    })
	*/
	new webpack.optimize.UglifyJsPlugin({
	// beautify: true,
    // mangle: false,
    output: {
      comments: false
    },
	
    compress: {
      warnings: false,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
      negate_iife: false // we need this for lazy v8
    },
	
    sourceMap: true
  }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(ENV),
	  'process.env.AOT': true
    }),
    
	new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: true // workaround for ng2
      }
    })
	
	
	
  ]
});

