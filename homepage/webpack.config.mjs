import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { ModuleFederationPlugin } = require("webpack").container;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/main.jsx",
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 5175,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".js", ".jsx"], // ✅ add this
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "HOME",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx", // ✅ double check path
      },
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
