const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const path = require('path')
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    // 输入文件目录
    outputDir: './dist',
    // 放置静态资源(js、css、img、fonts)的目录
    assetsDir: 'assets',
    // 是否在保存的时候使用 `eslint-loader` 进行检查, true|false|error
    lintOnSave: true,
    pages: {
        index: {
            // 页面入口
            entry: "src/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "simple-music",
            // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk
            chunks: [ "chunk-vendors", "chunk-common", "index" ]
        },
        // 当使用只有入口的字符串格式时，
        // 模板会被推导为 `public/subpage.html`
        // 并且如果找不到的话，就回退到 `public/index.html`
        // 输出文件名会被推导为 `subpage.html`
        // 多入口时，接着写子页面
        // subpage: "src/main.js"
    },
    // chainWebpack: config => {
    //     config.module
    //         .rule('css')
    //         .test(/\.css$/)
    //         .oneOf('vue')
    //         .resourceQuery(/\?vue/)
    //         .use('px2rem')
    //         .loader('px2rem-loader')
    //         .options({
    //             remUnit: 350
    //         })
    // },
    // configureWebpack: {
    //     plugins: [
    //         new SkeletonPlugin({
    //             pathname: path.resolve(__dirname, './shell'),       // 用来存储shell文件的地址
    //             staticDir: path.resolve(__dirname, './dist'),
    //             routes: ['/', '/find']      // 将需要生成骨架屏的路由 添加到数组中
    //         })
    //     ]
    // },
    // chainWebpack: (config) => {
    //     if(process.env.NODE_ENV !== 'development') {
    //         config.plugin('html').tap(opts => {
    //             opts[0].minify.removeComments = false
    //             return opts
    //         })
    //     }
    // },
    // devServer: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: '8087',
    //     https: false,
    //     hotOnly: false,
    //     proxy: {
    //         target: 'http://localhost:8087',
    //         changeOrigin: true,
    //         ws: true
    //     }
    // }
}