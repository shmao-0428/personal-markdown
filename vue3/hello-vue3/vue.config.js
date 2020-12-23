const path = require('path');
export default {
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src'));
  },
};
