const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ["./src/index.ts"],

  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin([{ from: "img", to: "img" }]),
  ],
  module: {
    rules: [{ test: /\.ts/, use: "ts-loader" }],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
  },
};
