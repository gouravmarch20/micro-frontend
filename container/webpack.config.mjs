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
    port: 5173,
  },
  output: {
    publicPath: "auto",
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
  devServer: {
    historyApiFallback: true,
    port: 5173,
    static: path.join(__dirname, "dist"),
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        CoursePage: "COURSE@http://localhost:5174/remoteEntry.js",
        HomePage: "HOME@http://localhost:5175/remoteEntry.js",
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
