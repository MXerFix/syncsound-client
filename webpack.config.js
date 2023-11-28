const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV == "development";
const GLOBAL_CSS_REGEXP = /\.global\.css$/;

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },

  mode: !IS_DEV ? NODE_ENV : "development",

  entry: {
    main: path.resolve(__dirname, "src/index.tsx")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].chunk.[contenthash].js",
    assetModuleFilename: "assets/[name][hash][ext][query]",
    publicPath: '/',
    clean: true
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[tj]sx?$/,
        use: [{
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: /\.pdf$/,
        use: ['file-loader'],
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ["style-loader", "css-loader",'postcss-loader'],
      },
      {
        test: /\.(jpg|svg|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new Dotenv({
      path: './.env',
      safe: false,
    }),
    new ForkTsCheckerWebpackPlugin({})
  ],

  devServer: {
    port: 3210,
    open: false,
    hot: IS_DEV,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  devtool: IS_DEV ? "inline-source-map" : false,

  // optimization: {
  //   splitChunks: {
  //     filename: "[name]-chunk-[contenthash].js"
  //   },
  //   emitOnErrors: true
  // }

};
