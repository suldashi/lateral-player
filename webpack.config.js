const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development'
  return {
    entry: './src/ui/ui.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: isDevelopment
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        },
        {
          test: /\.s(a|c)ss$/,
          exclude: /\.module\.s(a|c)ss$/,
          loader: [
            isDevelopment? 'style-loader': MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.scss']
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'js/ui.js'
    },
    watchOptions: {
      ignored: ["node_modules","app","public"]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDevelopment? 'css/style.css' : 'css/style.[hash].css',
        chunkFilename: isDevelopment ? 'css/[id].css' : 'css/[id].[hash].css'
      })
    ]
  }};