const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { container } = webpack;

const ModuleFederationPlugin = container.ModuleFederationPlugin;

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.ts",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  devtool: "source-map",
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
  module: {
    rules: [{ test: /\.[jt]sx?$/, loader: "ts-loader", exclude: /node_modules/ }]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new ModuleFederationPlugin({
      name: "remote1",
      filename: "remoteEntry.js",
      exposes: { "./Widget": "./src/Widget" },
      shared: {
        react: { singleton: true, requiredVersion: false},
        "react-dom": { singleton: true, requiredVersion: false},
        "react/jsx-runtime": { singleton: true, requiredVersion: false}
      }
    })
  ],
  devServer: {
    port: 3011,
    historyApiFallback: true,
    hot: true
  }
};

module.exports = config;

