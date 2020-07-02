module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    // 输入文件目录
    outputDir: './dist',
    // 放置静态资源(js、css、img、fonts)的目录
    assetsDir: 'assets',
    // 是否在保存的时候使用 `eslint-loader` 进行检查, true|false|error
    lintOnSave: true,
}