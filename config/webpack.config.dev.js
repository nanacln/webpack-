const path = require('path')
const config = require('./index')
const webpackBaseConfig = require('./webpack.config.base')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const notifier = require('node-notifier')
const portfinder = require('portfinder')
const utils = require('./utils')

var pages = utils.getEntry2('./src/pages/**/index.html');
var htmls = [];
Object.keys(pages).forEach(name => {

  var templateUrl = pages[name];

  var templateThunks = [name]
  htmls.push(new HtmlWebpackPlugin({
    filename: name + '.html',
    template: templateUrl, // 模板路径
    inject: true,
    chunks: templateThunks
  }))
})

const webpackDevConfig = merge(webpackBaseConfig, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devtool: config.dev.devtool,
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: config.dev.host,
        port: config.dev.port,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxy,
        quiet: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        ...htmls
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: './src/pages/index/index.html',
        //     inject: true,
        //     chunks:["index"]
        // }),
        // new HtmlWebpackPlugin({
        //     filename: 'test.html',
        //     template: './src/pages/test/index.html',
        //     inject: true,
        //     chunks:["test"]
        // })
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            webpackDevConfig.devServer.port = port
            webpackDevConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`You application is running here ${webpackDevConfig.devServer.host}:${port}`]
                },
                onErrors: (severity, errors) => {
                    if (severity !== 'error') {
                        return
                    }
                    const error = errors[0]
                    const filename = error.file && error.file.split('!').pop()
                    notifier.notify({
                        title: error.name,
                        subtitle: filename || '',
                        message: severity + ': ' + error.message
                    });
                }
            }))
            resolve(webpackDevConfig)
        }
    })
})