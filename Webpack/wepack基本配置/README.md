# webpack 常用配置解析

# 1. webpack 简介

## 1.1 webpack 是什么

webpack 是一种前端资源构建工具，一个静态模块打包器(module bundler)。 在 webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。 它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

## 1.2 webpack 五个核心概念

**1.2.1 Entry**
入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

**1.2.2 Output**
输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

**1.2.3 Loader**
Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解 JavaScript)

**1.2.4 Plugins**
插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩， 一直到重新定义环境中的变量等。

**1.2.5 Mode**
模式(Mode)指示 webpack 使用相应模式的配置。

|    选项     |                                                                                                                    描述                                                                                                                     |            特点             |
| :---------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------: |
| development |                                                              会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。                                                              | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线 运行的环境 |

# 2. webpack 的初体验

## 2.1 初始化配置

**1. 初始化 package.json**

输入指令:

`npm init`

**2. 下载并安装 webpack**

输入指令:

`npm install webpack webpack-cli -g`

`npm install webpack webpack-cli -D`

## 2.2 编译打包应用

**1. 创建文件**

**2. 运行指令**

- 开发环境指令：`webpack src/js/index.js -o build/js/built.js --mode=development`

- 功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成

浏览器能识别的语法。

- 生产环境指令：`webpack src/js/index.js -o build/js/built.js --mode=production`

- 功能：在开发配置功能上多一个功能，压缩代码。

**3. 结论**

- webpack 能够编译打包 js 和 json 文件。

- 能将 es6 的模块化语法转换成浏览器能识别的语法。

- 能压缩代码。

**4. 问题**

- 不能编译打包 css、img 等文件。

- 不能将 js 的 es6 基本语法转化为 es5 以下语法。

## 3. webpack 开发环境的基本配置

**3.1 创建配置文件`webpack.config.js`**

> webpack.base.config.js

```js
/** 安装依赖
 * 打包 HTML 资源 : npm install --save-dev html-webpack-plugin
 * 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D
 * 打包图片资源: npm install --save-dev html-loader url-loader file-loader
 * 打包其他资源:
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
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
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
};
```

**3.2 输出指令**

- 打包
  - `webpack` 直接打包
  - `webpack-dev-server` 启动服务

## 4. webpack 生产环境基本配置

> webpack.prod.base.config.js

```js
/** 安装依赖
 * 打包 HTML 资源 : npm install --save-dev html-webpack-plugin
 * 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D
 * 打包图片资源: npm install --save-dev html-loader url-loader file-loader
 * js 语法检查: npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
 * 提取 css 成单独文件: npm install --save-dev mini-css-extract-plugin
 * css 兼容性处理: npm install --save-dev postcss-loader postcss-preset-env
 * 压缩 css: npm install --save-dev optimize-css-assets-webpack-plugin
 * js 兼容性处理: npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
 */
const { resolve } = require('path');
/** 插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); /** 打包 HTML 资源 : npm install --save-dev html-webpack-plugin */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); /** 提取 css 成单独文件 */
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); /** 压缩 css */

// ! 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// !复用 loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在 package.json 中定义 browserslist
    loader: 'postcss-loader',
    options: { ident: 'postcss', plugins: () => [require('postcss-preset-env')()] },
  },
];

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
  mode: 'production',
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
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
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
          //   'style-loader',
          /**
           * ! 这个 loader 取代 `style-loader`。
           * 作用：提取 js 中的 css 成单独文件 */
          MiniCssExtractPlugin.loader,
          /** 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串 */
          'css-loader',
          /**
           *  ! css 兼容性处理 npm install --save-dev postcss-loader postcss-preset-env
           *  ! 配置package.json适配浏览器
           * "browserslist": {
           * "development": [ "last 1 chrome version", "last 1 firefox version", "last 1 safari version" ],
           * "production": [ ">0.2%", "not dead", "not op_mini all" ]
           * }
           */
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss 的插件
                require('postcss-preset-env')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          //   'style-loader',
          MiniCssExtractPlugin.loader,
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
          // !输出目录
          outputPath: 'imgs',
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
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
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
        // !优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误
          fix: true,
        },
      },
      /**
       * !js兼容
       * 正常来讲，一个文件只能被一个 loader 处理。
       * 当一个文件要被多个 loader 处理，那么一定要指定 loader
       * 执行的先后顺序： 先执行 eslint 在执行 babel
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示 babel 做怎么样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定 core-js 版本
                corejs: { version: 3 },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  /** plugins 的配置 */
  plugins: [
    /**  html-webpack-plugin
     * 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） */
    new HtmlWebpackPlugin({
      /** 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS） */
      template: './src/index.html',
      /**
       * !压缩 html 代码
       */
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    /**
     * ! 提取 css 成单独文件 */
    new MiniCssExtractPlugin({
      // 对输出的 css 文件进行重命名
      filename: 'css/built.css',
    }),
    /**
     * ! 压缩 css
     */
    new OptimizeCssAssetsWebpackPlugin(),
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
```

## 5. webpack 优化配置

> webpack.optimize.config.js

```js
/** 安装依赖
 * 打包 HTML 资源 : npm install --save-dev html-webpack-plugin
 * 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D
 * 打包图片资源: npm install --save-dev html-loader url-loader file-loader
 * js 语法检查: npm install --save-dev eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
 * 提取 css 成单独文件: npm install --save-dev mini-css-extract-plugin
 * css 兼容性处理: npm install --save-dev postcss-loader postcss-preset-env
 * 压缩 css: npm install --save-dev optimize-css-assets-webpack-plugin
 * js 兼容性处理: npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
 * !pwa: npm install --save-dev workbox-webpack-plugin
 * 多进程打包: npm install --save-dev thread-loader
 */
const { resolve } = require('path');
/** 插件 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); /** 打包 HTML 资源 : npm install --save-dev html-webpack-plugin */
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); /** 提取 css 成单独文件 */
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); /** 压缩 css */
/** pwa 渐进式网络开发应用程序(离线可访问)
 * workbox --> workbox-webpack-plugin */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// ! 定义 nodejs 环境变量：决定使用 browserslist 的哪个环境
process.env.NODE_ENV = 'production';

// !复用 loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在 package.json 中定义 browserslist
    loader: 'postcss-loader',
    options: { ident: 'postcss', plugins: () => [require('postcss-preset-env')()] },
  },
];

modules.exports = {
  /** 单入口文件 */
  entry: './src/index.js',
  /** 多入口文件 */
  // entry: {
  //   //! 多入口：有一个入口，最终输出就有一个 bundle
  //   index: './src/js/index.js',
  //   test: './src/js/test.js',
  // },
  /** 输出配置 */
  output: {
    /** 输出文件名 */
    filename: 'js/[name].[contenthash:10].js',
    /** 输出文件配置路径 */
    path: resolve(__dirname, 'build'),
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
  mode: 'production',
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
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
    // !开启 HMR 功能
    hot: true,
  },
  /** source-map */
  devtool: 'eval-source-map',
  /** loader配置 */
  modules: {
    rules: [
      /** 详细loader配置, 不同文件必须配置不同的loader */

      /*js 语法检查： eslint-loader eslint
       * 注意：只检查自己写的源代码，第三方的库是不用检查的
       * 设置检查规则： package.json 中 eslintConfig 中设置~
       * "eslintConfig": { "extends": "airbnb-base" }
       * airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // !优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // 自动修复 eslint 的错误
          fix: true,
        },
      },
      /**
       * !以下 loader 只会匹配一个
       * !注意：不能有两个配置处理同一种类型文件
       */
      {
        oneOf: [
          /** 打包样式资源文件依赖: npm i css-loader style-loader less-loader less -D */
          {
            /** 匹配哪些文件 */
            test: /\.css$/,
            /** 使用哪些loader */
            use: [
              /**use 数组中 loader 执行顺序：从右到左，从下到上 依次执行 创建 style 标签，
               * 将 js 中的样式资源插入进行，添加到 head 中生效 */
              //   'style-loader',
              /**
               * ! 这个 loader 取代 `style-loader`。
               * 作用：提取 js 中的 css 成单独文件 */
              MiniCssExtractPlugin.loader,
              /** 将 css 文件变成 commonjs 模块加载 js 中，里面内容是样式字符串 */
              'css-loader',
              /**
               *  ! css 兼容性处理 npm install --save-dev postcss-loader postcss-preset-env
               *  ! 配置package.json适配浏览器
               * "browserslist": {
               * "development": [ "last 1 chrome version", "last 1 firefox version", "last 1 safari version" ],
               * "production": [ ">0.2%", "not dead", "not op_mini all" ]
               * }
               */
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    // postcss 的插件
                    require('postcss-preset-env')(),
                  ],
                },
              },
            ],
          },
          {
            test: /\.less$/,
            use: [
              //   'style-loader',
              MiniCssExtractPlugin.loader,
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
              // !输出目录
              outputPath: 'imgs',
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
            options: {
              name: '[hash:10].[ext]',
              outputPath: 'media',
            },
          },

          /**
           * !js兼容
           * 正常来讲，一个文件只能被一个 loader 处理。
           * 当一个文件要被多个 loader 处理，那么一定要指定 loader
           * 执行的先后顺序： 先执行 eslint 在执行 babel
           */
          {
            test: /\.js$/,
            exclude: /node_modules/,
            // loader: 'babel-loader',
            use: [
              /**
               *  !开启多进程打包。 进程启动大概为 600ms，进程通信也有开销。
               *  !只有工作消耗时间比较长，才需要多进程打包
               */
              {
                loader: 'thread-loader',
                options: {
                  workers: 2, // 进程 2 个
                },
              },
              {
                loader: 'babel-loader',
                options: {
                  // 预设：指示 babel 做怎么样的兼容性处理
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        // 按需加载
                        useBuiltIns: 'usage',
                        // 指定 core-js 版本
                        corejs: { version: 3 },
                        // 指定兼容性做到哪个版本浏览器
                        targets: {
                          chrome: '60',
                          firefox: '60',
                          ie: '9',
                          safari: '10',
                          edge: '17',
                        },
                      },
                    ],
                  ],
                  // !开启 babel 缓存
                  // !第二次构建时，会读取之前的缓存
                  cacheDirectory: true,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  /** plugins 的配置 */
  plugins: [
    /**  html-webpack-plugin
     * 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS） */
    new HtmlWebpackPlugin({
      /** 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS） */
      template: './src/index.html',
      /**
       * !压缩 html 代码
       */
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
    /**
     * ! 提取 css 成单独文件 */
    new MiniCssExtractPlugin({
      // 对输出的 css 文件进行重命名
      filename: 'css/built.[contenthash:10].css',
    }),
    /**
     * ! 压缩 css
     */
    new OptimizeCssAssetsWebpackPlugin(),
    /**
     * !pwa
     * */
    new WorkboxWebpackPlugin.GenerateSW({
      /*1. 帮助 serviceworker 快速启动 
      2. 删除旧的 serviceworker 生成一个 serviceworker 配置文件~ */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  /**
   * ! 1. 可以将 node_modules 中代码单独打包一个 chunk 最终输出
   * ! 2. 自动分析多入口 chunk 中，有没有公共的文件。如果有会打包成单独一个 chunk
   * */
  optimization: {
    splitChunks: {
      chunks: 'all',
      // 默认值，可以不写~
    },
    // 将当前模块的记录其他模块的 hash 单独打包为一个文件 runtime
    // 解决：修改 a 文件导致 b 文件的 contenthash 变化
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    minimizer: [
      // 配置生产环境的压缩方案：js 和 css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动 source-map
        sourceMap: true,
      }),
    ],
  },
  externals: {
    // 拒绝 jQuery 被打包进来
    jquery: 'jQuery',
  },
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
```

## 6. dll

> webpack.dll.js

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // 告诉 webpack 哪些库不参与打包，同时使用时的名称也得变~
    new webpack.DllReferencePlugin({
      manifest: resolve(__dirname, 'dll/manifest.json'),
    }),
    // 将某个文件打包输出去，并在 html 中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js'),
    }),
  ],
  mode: 'production',
};
```

## webpack 5.0

webpack 5 将许多配置设置为默认配置, 我们只需配置 mode 即可 快速开发

```js
module.exports = {
  mode: 'development', // production
};

# npx webpack serve
# npx webpack
```

## vue-cli

- 查看项目 webpack 基本配置
  - vue inspect --mode=development > webpack.dev.config.js
  - vue inspect --mode=production > webpack.prod.config.js

# 参考链接

1. [尚硅谷最新版 Webpack5 实战教程(从入门到精通)](https://www.bilibili.com/video/BV1e7411j7T5)
2. [webpack](https://webpack.js.org/)
