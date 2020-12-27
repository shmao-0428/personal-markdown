"use strict";

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin'); // const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  /** 指定入口文件 */
  entry: './src/index.ts',

  /** 指定打包后文件所在目录 */
  output: {
    /** 打包后的文件目录 */
    path: path.resolve(__dirname, 'dist'),

    /** 打包后的文件 */
    filename: 'bundle.[name].js',
    // filename: 'bundle.[hash].js',
    environment: {
      /** 告诉webpack不要使用箭头函数 */
      arrowFunction: false,

      /** 兼容ie */
      "const": false
    }
  },
  mode: 'development',
  // mode: 'production',

  /** 指定webpack打包时的模块 */
  module: {
    /** 指定要加载模块的规则 */
    rules: [{
      test: /\.tsx?$/,

      /** 要使用的loader */
      use: [{
        /** 指定加载器 */
        loader: 'babel-loader',

        /** 设置babel */
        options: {
          /** 设置预定义的环境 */
          presets: [[
          /** 指定环境的插件 */
          '@babel/preset-env',
          /** 配置信息 */
          {
            /** 要兼容的浏览器 */
            targets: {
              chrome: '58',
              ie: '11'
            },

            /** core-js指定版本 */
            corejs: '3',

            /** 使用core-js的方式, `usage`表示按需加载 */
            useBuiltIns: 'usage'
          }]]
        }
      }, 'ts-loader'],
      exclude: /node_modules/
    },
    /** 设置less */
    {
      test: /\.less$/,
      use: ['style-loader', 'css-loader',
      /** 引入postcss */
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [['postcss-preset-env', {
              browers: 'last 2 versions'
            }]]
          }
        }
      }, 'less-loader']
    }]
  },

  /** 处理插件 */
  plugins: [// new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    //   title: '这是我的title',

    /** 指定模板 */
    template: './src/index.html'
  })],

  /** 用来设置引用模块 */
  resolve: {
    extensions: ['.ts', '.js']
  }
};