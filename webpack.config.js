const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  entry: {
    app: "./src/index.tsx"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  output: {
    filename: "js/[name].bundle.js",
    path: path.resolve(__dirname, "./dist/js/")
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    hot: false,
    inline: false,
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["env"] }
          },
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
