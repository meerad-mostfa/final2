const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: false, // تأكد من تعطيل HMR
    liveReload: false,
    watchFiles: ["src/**/*"],
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new InjectManifest({
      swSrc: './src/client/sw.js',
      swDest: 'service-worker.js', // تأكد من استخدام الاسم الصحيح
      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/, /\.svg$/],
    }),
  ],
};
