const path = require('path');

module.exports = {
  // https://github.com/webpack-contrib/worker-loader
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        options: { inline: 'fallback', filename: `workerName.[hash].js` },
      },
    });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject('this');
  },
};
