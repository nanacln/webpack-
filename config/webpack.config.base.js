const path = require('path')
const config = require('./index')
const SpritesmithPlugin = require('webpack-spritesmith')
const utils = require('./utils')

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
// const { getEntry } = require('./utils.js')
module.exports = {
    context: path.resolve(__dirname, '../'),
    // entry:getEntry(),
    entry: utils.getEntry2("./src/pages/*/main.js"),
    // entry: {
    //     main: './src/main.js'
    // },
    // entry:{
    //     index:'./src/pages/index/main.js',
    //     test:'./src/pages/test/main.js'
    // },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
        ? config.prod.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.json', 'jsx'],
        alias: {
            '@': resolve('src'),
            '@static': resolve('static')
        },
        modules: ['node_modules', resolve('src/assets/images')]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }, {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ],
                exclude: [resolve('node_modules')],
                include: [resolve('src')]
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name]_[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name]_[hash:8].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: 'fonts/[name]_[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: resolve('src/assets/images/icons'),
                glob: '*.png'
            },
            target: {
                image: resolve('src/assets/images/sprite.png'),
                css: [
                    [resolve('src/assets/scss/_sprite.scss'), {
                        format: 'based_template'
                    }]
                ]
            },
            customTemplates: {
                'based_template': config.templateWeb
            },
            apiOptions: {
                cssImageRef: '../images/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down', //'top-down', 'left-right', 'diagonal', 'alt-diagonal', 'binary-tree'
                padding: 10
            }
        })
    ],
    externals: {
        jquery: 'jQuery',
        swiper: 'Swiper',
        Bselector:'Bselector'
    }
}

