module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        devtool: 'cheap-module-eval-source-map',
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        // host: 'localhost',
        host:'0.0.0.0',
        port: 8888
    },
    prod: {
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        devtool: 'source-map'
    },
    templatePc(data) {  //PC sprite template
        return data.sprites.map(sprite => {
            return (
`.icon-${sprite.name} {
    width: ${sprite.px.width};
    height: ${sprite.px.height};
    background: url(${sprite.image}) ${sprite.px.offset_x} ${sprite.px.offset_y} no-repeat;
    background-size: ${sprite.px.total_width} ${sprite.px.total_height};       
}\n`)
        }).join('')
    },
    templateWeb(data) {  //WEB sprite template
        return data.sprites.map(sprite => {
            return (
`.icon-${sprite.name} {
    width: ${sprite.width}pr;
    height: ${sprite.height}pr;
    background: url(${sprite.image}) ${sprite.offset_x}pr ${sprite.offset_y}pr no-repeat;
    background-size: ${sprite.total_width}pr ${sprite.total_height}pr;       
}\n`)
        }).join('')
    }
}