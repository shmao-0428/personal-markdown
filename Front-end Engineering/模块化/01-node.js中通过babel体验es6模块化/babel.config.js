/*
 * @Author: shmao
 * @Date: 2020-10-07 12:09:12
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-07 12:10:59
 */
const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
    },
  ],
];

module.exports = { presets };
