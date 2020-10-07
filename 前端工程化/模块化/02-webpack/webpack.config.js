/*
 * @Author: shmao
 * @Date: 2020-10-07 12:40:39
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-07 12:45:02
 */
const path = require('path');
function resolvePath(_path) {
  return path.resolve(__dirname, _path);
}
module.exports = {
  mode: 'development',
  entry: './src/index.js', // 入口
  // 出口
  output: {
    path: resolvePath('dist'),
    filename: 'my-first-webpack.boundle.js',
  },
};
