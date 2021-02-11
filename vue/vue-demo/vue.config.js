const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      // 设置vue-element-admin代理
      '/dev-api': {
        target: 'http://localhost:9527/dev-api',
        changeOrigin: true,
      },
    },
  },
  // https://github.com/webpack-contrib/worker-loader
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        options: { inline: 'no-fallback', filename: `workerName.[hash].js` },
      },
    });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject('this');
  },
};
