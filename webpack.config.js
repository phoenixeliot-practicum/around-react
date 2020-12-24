const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const config = {
    entry: { main: "./src/index.js" },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
      publicPath: env.production ? "/around-react/" : "/",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: "/node_modules/",
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|gif|woff|woff2)$/,
          loader: "file-loader",
        },
      ],
    },
    stats: "verbose",
    plugins: [
      new HtmlWebpackPlugin({
        template: "src/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
  };
  console.log(config);
  return config;
};
