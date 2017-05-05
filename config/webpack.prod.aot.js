"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-helpers");
//---------------------------------------------------------------------------------------------
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var commonConfig = require('./webpack.common.js');
//var helpers = require('./helpers');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require('compression-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
//const ScriptExtPlugin = require('script-ext-html-webpack-plugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var webpackMerge = require('webpack-merge');
var ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var AOT = true;
var EXCLUDE_SOURCE_MAPS = true;
var _a = require('./helpers.js'), hasProcessFlag = _a.hasProcessFlag, includeClientPackages = _a.includeClientPackages, root = _a.root, testDll = _a.testDll;
var MY_CLIENT_RULES = [];
var clientConfig = function webpackConfig() {
    //let config: WebpackConfig = Object.assign({});
    var config = Object.assign({});
    config.plugins = [];
    //--------------modules--------------------------------------------------------------------------
    config.module = {
        rules: [
            /*{
              test: /\.ts$/,
              loaders: [
                {
                  loader: 'awesome-typescript-loader',
                  options: { configFileName: root('src', 'tsconfig.aot.json') }
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
            /*{
              test: /\.css$/,
              exclude: helpers.root('src', 'app'),
              loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            */
            {
                test: /\.css$/,
                include: root('src', 'app'),
                loader: 'raw-loader'
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader'
                //exclude: [EXCLUDE_SOURCE_MAPS]
            },
            {
                test: /\.ts$/,
                loaders: [
                    '@angularclass/hmr-loader',
                    'awesome-typescript-loader?{configFileName: "tsconfig.aot.json"}',
                    'angular2-template-loader',
                    'angular-router-loader?loader=system&genDir=compiled&aot=' + AOT
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.html/, loader: 'raw-loader', exclude: [root('src/index.html')] },
            { test: /\.css$/, loader: 'raw-loader' }
        ].concat(MY_CLIENT_RULES)
    };
    //-------------------plugins ------------------------------------------------------------------
    config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    })
    */
    config.plugins.push(new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, root('./src')));
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'] }
    //  /* chunkName= */"vendor", /* filename= */"vendor.bundle.js"
    ));
    config.plugins.push(new HtmlWebpackPlugin({
        template: root('src/index.html')
    }));
    config.plugins.push(new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
    ]));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: false,
    }));
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
    /*
     new NoEmitOnErrorsPlugin(),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
    */
    //sourceMap: true
    //}),
    return config;
}();
var defaultConfig = {
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    entry: {
        main: root('./src/main.browser.aot')
        //'polyfills': './src/polyfills.ts',
        //'vendor': './src/vendor.ts',
        //'app': './src/main.ts'
    },
    output: {
        path: root('dist'),
        filename: 'index.js'
    }
};
module.exports = webpackMerge({}, defaultConfig, clientConfig);
//------------------------old--------------------------------------------------------------
/*
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
           options: { configFileName: helpers.root('src', 'tsconfig.aot.json') }
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
   //new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
   //  mangle: {
   //    keep_fnames: true
   //  }
   //})
   
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
     'process.env.AOT': AOT
   }),
   
   new webpack.LoaderOptionsPlugin({
     htmlLoader: {
       minimize: true // workaround for ng2
     }
   })

 ],
 
});
*/
//# sourceMappingURL=webpack.prod.aot.js.map