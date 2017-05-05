
import 'ts-helpers';

var webpack = require('webpack');

const { hasProcessFlag, includeClientPackages, root, testDll } = require('./helpers.js');

//var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var commonConfig = require('./webpack.common.js');
//var helpers = require('./helpers');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
//const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpackMerge = require('webpack-merge');

const AOT = true;
const PROD = true;
//const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
//const HMR = false;

const CONSTANTS = {
  AOT: AOT,
  ENV: PROD ? JSON.stringify('production') : JSON.stringify('development'),
  //HMR: HMR,
  //HOST: JSON.stringify(HOST),
  //PORT: PORT,
  //STORE_DEV_TOOLS: JSON.stringify(STORE_DEV_TOOLS),
  //UNIVERSAL: UNIVERSAL
};


//const ENV = process.env.NODE_ENV = process.env.ENV = 'production';


const EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
];
const MY_CLIENT_RULES = [];


const clientConfig = function webpackConfig(): WebpackConfig {

	//let config: WebpackConfig = Object.assign({});
	let config : WebpackConfig = Object.assign({});
	config.plugins = [];

//--------------modules--------------------------------------------------------------------------
	config.module = {
    rules: [
      
	  /*
      {
        test: /\.css$/,
        include: root('src', 'app'),
        loader: 'raw-loader'
      },
	  */
	  {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [EXCLUDE_SOURCE_MAPS]
      },
      
	  {
        test: /\.ts$/,
        loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader?{configFileName: "tsconfig.webpack.json"}',
          'angular2-template-loader',
          'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT
        ],
        exclude: [/\.(spec|e2e|d)\.ts$/]
      },
	  
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader' },
      ...MY_CLIENT_RULES
    ]
	};
	
	
//-------------------plugins ------------------------------------------------------------------
		
	config.plugins.push(
	 new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
           root('./src')
      ),

	 /* 
	  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin(
      //{ name: ['app', 'vendor', 'polyfills']}     
	   { name: ['index.js']}     
    )
	);
	*/	

	/*
    new HtmlWebpackPlugin({
      template: root('src/index.html')
    }),
	*/
	
    new CopyWebpackPlugin([
        { from: root('src/assets'), to: 'assets' },
		{ from: root('src/index.html') }
    ]),
	
	
	
	new webpack.optimize.UglifyJsPlugin({
		beautify: false,
		mangle: false,
    //output: {
    //  comments: false
    //})
	}),
	
	
	
      new webpack.NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
    );
	
	/*
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
	*/
	
		
    //sourceMap: true
  //}),
 return config;
} ();
  
  const defaultConfig = {
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	
	entry : { 	 
		 main: root('./src/main.browser.aot')
		//'polyfills': './src/polyfills.ts',
		//'vendor': './src/vendor.ts',
		//'app': './src/main.ts'
	},
	  
	output : {
      path: root('dist'),
      filename: 'index.js'
    },
	
	plugins : [
		new webpack.ProgressPlugin(),
		new CheckerPlugin(),
		new webpack.DefinePlugin(CONSTANTS),
		new webpack.NamedModulesPlugin()
	]
	
	};
	
	 module.exports = webpackMerge({}, defaultConfig, clientConfig);
  
 
