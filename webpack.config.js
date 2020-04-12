/* eslint-disable global-require */
/* eslint-disable no-console */
const path = require("path");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].min.js",
    libraryTarget: "commonjs2",
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve("./src")],
        loader: "babel-loader",
        options: require("./babel.config"),
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
};

// if (process.env.NODE_ENV === "production") {
//   config.plugins = [new BundleAnalyzerPlugin()];
// }

module.exports = config;
