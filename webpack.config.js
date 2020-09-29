const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'none' : 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        },
        watch: !isProduction,
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'main.js'
        },
        resolve: {
          extensions: [".js", ".marko"]
        },
        module: {
            rules: [
                {
                  test: /\.marko$/,
                  loader: "@marko/webpack/loader"
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                  },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
                    ]
                }, {
                    test: /\.(png|svg|svg|jpe?g|gif)$/,
                    use: [
                        {
                          loader: 'file-loader',
                          options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/',
                          }
                        },
                      ],
                }
            ]
          },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                favicon: './src/assets/favicon.ico',
            }),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyWebpackPlugin([
                { from: './src/assets', to: './' },
            ]),
        ],
    }

    return config;
}   