//
//
//

const path = require('path');

//
// constants //////////////////////////////////////////////////////////////////
//

const ROOT_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const APP_DIR  = path.join(ROOT_DIR, 'app');

//
// configuration //////////////////////////////////////////////////////////////
//

const DefaultConfiguration = {

  //
  // entry point --------------------------------------------------------------
  //
  
  entry: [
    './app/index.js'
  ],

  //
  // mode ---------------------------------------------------------------------
  //

  mode: process.env.NODE_ENV,

  //
  // outputs ------------------------------------------------------------------
  //

  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },

  //
  // modules ------------------------------------------------------------------
  //

  module: {
    //
    // rules ------------------------------------------------------------------
    //
    rules: [
      //
      // babel transpilation --------------------------------------------------
      //
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

      //
      // sass -----------------------------------------------------------------
      //
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
      },

    ],
  },

  //
  //
  //
  resolve: {
    modules: [
      APP_DIR,
      'node_modules'
    ],
    alias: {
    }
  },

  //
  // dev server ---------------------------------------------------------------
  //
  devServer: {
    contentBase: DIST_DIR,
    hot: true,
    open: false,
    index: 'dist/index.htm',
    port: 8080,
  }

  //
  // end configuration --------------------------------------------------------
  //
}


//
// exports ////////////////////////////////////////////////////////////////////
//

module.exports = DefaultConfiguration;
