const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require('workbox-webpack-plugin'); // Import WorkboxPlugin

module.exports = {
  mode: "production",
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
          MiniCssExtractPlugin.loader, // Extract CSS to files
          "css-loader",   // Translate CSS into CommonJS
          "sass-loader"   // Compile Sass to CSS
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/views/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({ // Extract CSS to separate files
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new GenerateSW({ // Add Workbox plugin for Service Worker
      clientsClaim: true,
      skipWaiting: true,
      include: [/\.html$/, /\.js$/, /\.css$/, /\.png$/, /\.jpg$/, /\.svg$/], // Adjust as needed
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://example.com', // Adjust the pattern to match your needs
          handler: 'NetworkFirst',
        },
      ],
    }),
  ],
};
