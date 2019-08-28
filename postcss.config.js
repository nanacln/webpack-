const autoprefixer = require('autoprefixer')
const pr2rem = require('postcss-plugin-pr2rem')

const pr2remConfig = {
    // 设计图为 750px
    rootValue: 100,
    unitPrecision: 3,
    propWhiteList: [],
    propBlackList: [], 
    selectorBlackList: [],
    ignoreIdentifier: '00',
    replace: true,
    mediaQuery: false,
    minPixelValue: 0
}

module.exports = {
    plugins: [
        autoprefixer(),
        pr2rem(pr2remConfig)
    ]
}