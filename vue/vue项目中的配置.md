





> 本文内容来源于小编将开源的一个基于`vant`封装的开箱即用框架的一部分，本框架内部集成了包括：完整项目目录结构， 移动端适配，`vant`按需加载，`mock`,静态资源压缩，`axios`二次封装,日期工具类，`cdn`,代码规范等内容，可以做到下载即使用，无需做任何基础配置，欢迎大家使用，仓库地址 https://github.com/snowzijun/vue-vant-base，如果喜欢，麻烦给小编一个`star`,小编会持续更新。
>
> 文章取自公众号: `前端有的玩`

## 启用压缩，让页面加载更快

在我们开发的时候，为了方便调试，我们需要使用源码进行调试，但在生产环境，我们追求的更多的是加载更快，体验更好，这时候我们会将代码中的空格注释去掉，对待吗进行混淆压缩，只为了让`js`,`css`文件变得更小，加载更快。但只是这样做是不够的，我们还可以做得更极致。

`gzip`是`Web`世界中使用的最为广泛的文件压缩算法，当前我们使用的大多数服务端(比如nginx)和客户端(比如chrome)都已经支持了这个算法，所以如果我们在打包`Vue`项目的时候，可以直接将所有的静态资源压缩为`gzip`,就可以极大的减少静态资源的大小，提升浏览器加载速度，那`Vue`项目如何配置呢？

### 添加`vue.config.js` 文件

在新建`Vue`项目中，默认是没有`vue.config.js`文件的，首先你需要在项目根目录新建一个vue.config.js文件，然后在文件中加入以下代码

```
module.exports = {

}
```

本文后面会多次使用到`vue.config.js`文件，在后面将不再赘述。

### 配置`compression-webpack-plugin`

- 安装 `compression-webpack-plugin`

  ```
  yarn add compression-webpack-plugin -D
  ```

- 配置

  修改`vue.config.js`文件为以下代码

  ```
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  const isProd = process.env.NODE_ENV === 'production'
  module.exports = {
    configureWebpack: config => {
      if (isProd) {
        // 配置webpack 压缩
        config.plugins.push(
          new CompressionWebpackPlugin({
            test: /\.js$|\.html$|\.css$/,
            // 超过4kb压缩
            threshold: 4096
          })
        )
      }
    }
  }
  ```

- 查看压缩效果

  在配置上面的压缩之后，执行`yarn build`命令，会发现生成的静态文件里面新增了后缀为`gz`的文件

  ![img](https://mmbiz.qpic.cn/mmbiz_jpg/RJ77bHenS4QtibgMEgMgy9S5ozHDyN5FE7Hvicia3jP5HJSeQhfebnP1zcrjVhhmibpUMgpH815WibMD3GBlQ4IH2qQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  如果此时将项目部署到已开启了`gzip`的服务器如`nginx`里面之后，访问浏览器即可看到浏览器下载的是已压缩的文件

- ![img](https://mmbiz.qpic.cn/mmbiz_jpg/RJ77bHenS4QtibgMEgMgy9S5ozHDyN5FE6Cj7XVZsIkCdkiaKYHCcs61przuHQWBXJsII6msrjkFpoqVyd7YZdFw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

  



## 让`moment`变得更小

使用过`moment`的同学一定知道，`moment`的`locale`语言包特别大，但是我们一般的项目只在国内用，也用不到那么多语言，是不是可以去掉呢？这时候你需要使用到`webpack.IgnorePlugin`。

在`vue.config.js`文件，你需要添加以下代码

```
const webpack = require('webpack')
module.exports = {
  chainWebpack: config => {
    // 优化moment 去掉国际化内容
    config
    .plugin('ignore')
    // 忽略/moment/locale下的所有文件
    .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  }
}
```

我们虽然按照上面的方法忽略了包含’./locale/'该字段路径的文件目录,但是也使得我们使用的时候不能显示中文语言了，这时候如果想用某一种语言应该怎么办呢?

```
import moment from 'moment'
//手动引入所需要的语言包
import 'moment/locale/zh-cn';
// 指定使用的语言
moment.locale('zh-cn');
```

当然小编更建议在项目中使用更轻量级的`day.js`代替`moment`

## 生产环境删除`console.log`

开发环境为了调试，会添加大量的`console.log`，但如果`console.log`提交到生产环境里面，不仅仅会影响到代码执行性能，而且可能会泄露一些核心数据，所以我们更希望的是在生产环境，将所有的`console.log`清除掉，怎么做呢？

### 安装插件

需要安装`babel-plugin-transform-remove-console`插件

```
yarn add babel-plugin-transform-remove-console -D
```

### 配置`babel.config.js`

打开`babel.config.js`文件，然后在文件内添加

```
// 所有生产环境
const prodPlugin = []

if (process.env.NODE_ENV === 'production') {
  
// 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
}

module.exports = {
   plugins: [
     ...prodPlugin
   ]
}
```

## 开启`eslint`,`stylelint`

看到这一条，有些同学就有点受不了想退出了，配置这个不是自己给自己找不自在吗？在团队开发中，配置这些还是很有用的，制约团队中的每个人都按照标准来开发功能，这样至少大家写的代码不至于相互看不懂（我深受不规范代码的折磨啊）。

本节所有代码在github仓库中已上传，完整代码请查看 https://github.com/snowzijun/vue-vant-base

### 安装依赖

在配置这些`lint`之前，你需要安装这些插件

- @vue/cli-plugin-eslint
- @vue/eslint-config-prettier
- babel-eslint
- eslint
- eslint-plugin-babel
- eslint-plugin-prettier
- eslint-plugin-vue
- husky
- lint-staged
- prettier
- stylelint
- stylelint-config-recess-order
- stylelint-config-standard
- stylelint-prettier
- stylelint-scss

同时还需要给`vscode`以下插件

- `eslint`
- stylelint
- Prettier - Code formatter

### 配置`vscode`

在`vscode`的`setting`文件里面添加以下代码

```
"eslint.enable":true,
"eslint.options": {
  "extensions":[
    ".js",
    ".vue",
    ".ts",
    ".tsx"
  ]
 },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "css.validate": true,
  "scss.validate": true,
  "less.validate": true,
  "editor.codeActionsOnSave": {
     "source.fixAll": true
  },
```

### 配置`eslint`

首先在项目根目录下面添加 `.eslintrc.js`与`.eslintignore`文件

在`.eslintrc.js`文件内添加以下内容

```
// 缩略版
module.exports = {
  root: true,
  globals: {
    process: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ['babel', 'prettier'],
  rules:{
    // 校验规则此处略
 }
}
```

在`.eslintignore`文件中添加以下代码

```
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

配置完之后，在`package.json`的`script`里面添加

```
"eslint": "vue-cli-service lint"
```

然后执行`yarn eslint`就可以对代码进行格式化，当然`vscode`也会在你保存文件的时候校验一次

### 配置stylelint

限制`js`与`vue`是不够的，还需要限制以下`style`,感觉这是自己给自己无限挖坑的举措，但是这东西越用越爽，一起来看看

首先在项目根目录下面新建`.stylelintrc.js`与`.stylelintignore`文件

在`.stylelintrc.js`文件中添加以下内容

```
module.exports = {
  extends: ["stylelint-config-standard","stylelint-config-recess-order"],
  "plugins": [
    "stylelint-scss"
  ],
  rules: {
    // 校验规则略
  }
}
```

`.stylelintignore`文件内容与`.eslintignore`文件内容一致

配置完之后，在`package.json`的`script`里面添加

```
"stylelint": "stylelint src/**/*.{html,vue,css,sass,scss} --fix",
```

然后执行`yarn stylelint`就可以对样式进行格式化，当然`vscode`也会在你保存文件的时候校验一次

### 配置`husky`

上面配置完之后，写代码时候`vscode`会自动校验格式化代码， 但就怕有人用其他编辑器没有配置插件，将未校验的代码提交到仓库里面，导致所有人的代码都爆红，这时候就需要使用`husky`在提交代码时候进行校验。

在`git`提交代码时候，会触发一系列`hook`钩子函数，而`husky`就是一个`Git hooks`工具。`lint-staged`是一个在git暂存文件上运行linters的工具,为什么要用这个工具呢，因为我们在提交代码的时候，只需要对已经修改过的文件进行校验，不然检查所有文件，比较浪费时间。那我们改怎么配置呢？

你只需要在`package.json`文件里面添加以下代码

```
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{js,vue}": [
      "vue-cli-service lint",
      "git add -A"
    ],
    "*.{html,vue,css,sass,scss}": [
      "yarn stylelint"
    ]
  }
```

这时候你如果执行`git commit -m '提交描述'`的时候，会发现提交之前会调用`eslint`与`stylelint`进行代码校验，校验失败无法提交