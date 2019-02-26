const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
  },
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin()
    ]
  }
}