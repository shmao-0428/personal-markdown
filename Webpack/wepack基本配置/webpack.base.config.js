/** 安装依赖
 * 打包 HTML 资源 : npm install --save-dev html-webpack-plugin
 * 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D
 * 打包图片资源: npm install --save-dev html-loader url-loader file-loader
 * js 语法检查: npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
 */
const { resolve } = require('path');
/** 插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); /** 打包 HTML 资源 : npm install --save-dev html-webpack-plugin */

modules.exports = {
  /** 入口文件 */
  entry: './src/index.js',
  /** 输出配置 */
  output: {
    /** 输出文件名 */
    filename: './built.js',
    /** 输出文件配置路径 */
    path: resolve(__dirname, 'build/js'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath: '/',
    chunkFilename: 'js/[name]_chunk.js',
    // 非入口 chunk 的名称
    // library: '[name]',
    // 整个库向外暴露的变量名
    // libraryTarget: 'window'
    // 变量名添加到哪个上 browser
    // libraryTarget: 'global'
    // 变量名添加到哪个上 node
    // libraryTarget: 'commonjs'
  },
  /** 环境配置 development | production  */
  mode: 'development',
  /** devServer 开发配置
   *  npx webpack-dev-server
   *  version >= 5.0
   *  npx webpack serve
   */
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动 gzip 压缩
    compress: true,
    // 域名
    host: 'localhost',
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/,
    },
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦 devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器 (3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: { '^/api': '' },
      },
    },
  },
  /** loader配置 */
  modules: {
    rules: [
      /** 详细loader配置, 不同文件必须配置不同的loader */
      /** 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D */
      {
        /** 匹配哪些文件 */
        test: /\.css$/,
        /** 使用哪些loader */
        use: [
          /**use 数组中 loader 执行顺序：从右到左，从下到上 依次执行 创建 style 标签，
           * 将 js 中的样式资源插入进行，添加到 head 中生效 */
          'style-loader',
          /** 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串 */
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将 less 文件编译成 css 文件
          // 需要下载 less-loader 和 less
          'less-loader',
        ],
      },
      /** 打包图片资源文件 */
      {
        // 问题：默认处理不了 html 中 img 图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个 loader
        // 下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于 8kb，就会被 base64 处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为 url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭 url-loader 的 es6 模块化，使用 commonjs 解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的 hash 的前 10 位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        // 处理 html 文件的 img 图片（负责引入 img，从而能被 url-loader 进行处理）
        loader: 'html-loader',
      },
      /** 打包其他资源(除了 html/js/css 资源以外的资源) */
      {
        // 排除 css/js/html 资源
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: { name: '[hash:10].[ext]' },
      },
      /*js 语法检查： eslint-loader eslint
       * 注意：只检查自己写的源代码，第三方的库是不用检查的
       * 设置检查规则： package.json 中 eslintConfig 中设置~
       * "eslintConfig": { "extends": "airbnb-base" }
       * airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误
          fix: true,
        },
      },
    ],
  },
  /** plugins 的配置 */
  plugins: [
    // 详细 plugins 的配置
    /**  html-webpack-plugin
     * 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） */
    new HtmlWebpackPlugin({
      /** 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS） */
      template: './src/index.html',
    }),
  ],
  // 解析模块的规则
  resolve: {
    // 配置解析模块路径别名: 优点简写路径 缺点路径没有提示
    alias: { $css: resolve(__dirname, 'src/css') },
    // 配置省略文件路径的后缀名
    extensions: ['.js', '.json', '.jsx', '.css'],
    // 告诉 webpack 解析模块是去找哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
};
