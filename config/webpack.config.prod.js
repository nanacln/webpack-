const path = require('path')
const config = require('./index')
const webpackBaseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //extract css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //compress css
const TerserPlugin = require('terser-webpack-plugin') //compress js
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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

const webpackProdConfig = merge(webpackBaseConfig, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name]_[chunkhash:8].js',
        chunkFilename: 'js/[id]_[chunkhash:8].js',
        publicPath: config.prod.assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'image-webpack-loader',
                enforce: 'pre'
            }
        ]
    },
    devtool: config.prod.devtool,
    optimization: {
        concatenateModules: true,
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin({
                parallel: true,
                cache: true,
                terserOptions: {
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                        dead_code: true
                    }
                }
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash:8].css',
            chunkFilename: 'css/[name]_[contenthash:8].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        ...htmls,
        // new HtmlWebpackPlugin({
        //     filename: '../dist/index.html',
        //     template: 'src/index.html',
        //     inject: true
        // }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.dev.assetsSubDirectory,
            ignore: ['.*']
        }]),
        // new BundleAnalyzerPlugin()
    ]
})

module.exports = webpackProdConfig