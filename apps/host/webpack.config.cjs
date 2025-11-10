const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const { container } = webpack;
const ModuleFederationPlugin = container.ModuleFederationPlugin;

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.tsx",
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
      name: "host",
      filename: "remoteEntry.js",
      remotes: {
        remote1: "remote1@http://localhost:3011/remoteEntry.js"
      },
      exposes: {
        './store': './src/shared/store.ts',   // 👈 aquí exponemos el store
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false},
        zustand: { singleton: true, requiredVersion: false },
        "react/jsx-runtime": { singleton: true, requiredVersion: false}
      }
    })
  ],
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    hot: true
  }
};

module.exports = config;
