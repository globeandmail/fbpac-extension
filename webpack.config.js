const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");

const ENV = process.env.NODE_ENV || "development";

const outdir =
  ENV === "production"
    ? path.resolve(__dirname, "dist")
    : path.resolve(__dirname, "build");

module.exports = [
  {
    entry: "content.js",
    context: path.resolve(__dirname, "src"),
    output: {
      filename: "content.js",
      path: outdir
    },
    resolve: {
      modules: ["src", "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    devtool: "source-map"
  },
  {
    entry: "trust.js",
    context: path.resolve(__dirname, "src"),
    output: {
      filename: "trust.js",
      path: outdir
    },
    resolve: {
      modules: ["src", "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    devtool: "source-map"
  },
  {
    entry: "background.js",
    context: path.resolve(__dirname, "src"),
    output: {
      filename: "background.js",
      path: outdir
    },
    resolve: {
      modules: ["src", "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    devtool: "source-map"
  },
  {
    entry: "hot-reload.js",
    context: path.resolve(__dirname, "src"),
    output: {
      filename: "hot-reload.js",
      path: outdir
    },
    resolve: {
      modules: ["src", "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader"
        }
      ]
    },
    devtool: "source-map"
  },
  {
    context: path.resolve(__dirname, "src"),
    entry: "popup.jsx",
    output: {
      filename: "popup.js",
      path: outdir
    },
    resolve: {
      extensions: [".jsx", ".js"],
      modules: ["src", "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: ["source-map-loader"],
          enforce: "pre"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader?cacheDirectory"
        },
        {
          // look for .css or .scss files
          test: /\.(css|scss)$/,
          // in the `src` directory
          include: [path.resolve(__dirname, "src")],
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: process.env.NODE_ENV !== "production"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: process.env.NODE_ENV !== "production"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HTMLWebpackPlugin({
        title: "__MSG_extension_name__",
        meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' }
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(ENV)
      }),
      new CopyWebpackPlugin([
        {
          from: "../manifest.json",
          to: outdir
        },
        {
          from: "../_locales",
          to: outdir + "/_locales"
        },
        {
          from: "../assets",
          to: outdir + "/assets"
        }
      ])
    ],
    devtool: "source-map"
  }
];
