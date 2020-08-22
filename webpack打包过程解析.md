# Webpack

- [webpack官网](https://webpack.js.org/)
- [webpack中文网](https://webpack.docschina.org/)

####  概念  ==>  webpack 是什么??  前端模块化打包(构建)工具

> webpack可以解决这些依赖关系,并对他们进行打包

 ### webpack 的两个方面

> 1 - 打包  2 - 模块化

#### 一、打包 : 前端打包(构建)都能做什么??

1. **语法转换**

   ```js
   - Less/SASS 预编译CSS -> CSS -> 浏览器中使用
   - ES6 新语法有兼容性问题 -> ES5 -> 浏览器中使用
   - const fn = () => {} ===> var fn = function() {}
   ```

2. **文件压缩、合并**

   ```js
   JS/HTML/CSS 压缩后，才能发布上线
   文件合并（ 不管有多个JS、CSS，默认打包直接生成一个JS文件 ）
   ```

3. **开发期间提供一个服务器环境**

   ```js
    自动打开浏览器、监视文件变化，自动刷新浏览器
   ```

4. **项目上线,打包后才能上线**

5. **总结**

   ```js
    webpack 这个打包（构建）工具，就是提供了前端开发需要的一整套完整的流程，也就是
    webpack 能够渗透的前端开发的各个环节、各个流程中，帮你实现 复杂、繁琐、重复的工作，有了 webpack 后，开发人员只需要关注当前要实现的业务即可。
   ```

   

###二、模块化功能

- 模块化 :  逻辑

- 组件化 :   界面

- webpack为前端提供了模块化开发环境，而且webpack是基于node,有了webpack，就可以像写Node代码一样，写前端代码了

- 在 webpack 看来所有的资源都是模块，不管是： CSS、图片、字体、JS、html 等

- ```js
  在webpack提供的模块化环境中，
  1 想要加载一个JS文件，只需要 require('./a.js')
  2 想要加载一个CSS文件，只需要 require('../css/index.css')
  3 想要加载一个图片文件，只需要 require('../iamges/a.png')
  4 ...
  ```



## 三 : Webpack 四个核心概念：

>  **入口(entry)**、**出口(output)**、**加载器(loader)**、**插件(plugins)**

- 入口 : 要打包哪个文件
- 出口 : 要打包到哪里
- 加载器 : 加载除了js文件其他文件的功能
- 插件 : 处理加载器完成不了的功能, 使用插件



# webpack 使用步骤

## webpack 第一阶段 命名初始化阶段

> 文件名不能有汉字,不能取名叫 webpack

1. 生成 `package.json`, 命令 : `npm init -y`
2. 安装 : `npm i -D webpack webpack-cli`

```js
webpack  : 是 webpack 工具的核心包
webpack-cli : 提供了一些在终端中使用的命令
-D(--save-dev) : 表示项目开发期间的依赖,也就是 : 线上代码中用不到这些包了
```

3. 创建一个`main.js`文件

```js
console.log('我就要被打包了,哦也');
```

4. 在 `package.json`的`scripts`中,添加脚本

```js
 "scripts": {
    "build": "webpack main.js"
  },
// webpack 是webpack-cli 中提供的命令, 用来实现打包的
// ./main.js 入口文件,要打包哪个文件
```

5. 运行 : `npm run build`
6. 设置开发状态 : `mode`

```js
"build" : "webpack ./main.js --mode development"

// WARNING in configuration
// The 'mode' option has not been set, webpack will fallback to 'production' for this value.
// 如果没有设置 mode 配置项, webpack 会默认提供 开发环境(production)

// Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
// 项目开发的两种环境
  1. 开发环境 (development) : 开发过程就是开发环境
  2. 生产环境 (production) : 线上环境, 也就是 : 项目做好了,发布上线
  生产环境下, 打包生产的js文件都是压缩后的,  开发环境下代码一般是不压缩的
```

## webpack 第一阶段 隔行变色案例

1. 创建 `src/index.html` 
2. 隔行案例 => `html => ul#list>li{我是 li \$}\*10`
3. 安装 juqery : `npm i jquery`, 并且引入 `jquery`
4. 暂时引入 `main.js` , 在 main.js 里写入

```js
// 使用ES6的模块化语法
import $ from 'jquery' // 优点 不用沿着路径去找

$('#list > li:odd').css('backgroundColor', 'red')
$('#list > li:even').css('backgroundColor', 'green')
// 语法报错
```

5. 问题 :

```js
// 引入 main.js 会报错,因为浏览器不支持这个import 的Es6语法
// npm run build 之后
//  引入 dist/main.js 后会ok,因为webpack 帮我们转化为浏览器能够识别的es5语法了
```

6. 历程 :

```js
//1. 如果index.html 中引入 jquery , 再引入 mian.js (没有引入jquery了) => ok
//2. 如果index.html 中没有引入 jquery , 直接使用es6的模块化语法 import , 引入main.js就会报错
//3. 如果index.html 中没有引入 jquery , 直接使用es6的模块化语法 import , webapck打包出 dist/main.js 引入 dist/main.js  ==> ok
```

7. 为什么 `dist文件下的main.js` 文件里的代码突然这么多

   > 看图 (打包流程)

8. ***code 记得保存一份***


## webpack 第二阶段 webpack 配置文件

1. 准备工作 : `src`源文件 : `index.html`和`main.js`

2. webpack 打包有两种方式

   > 1-命令行 2-配置项

3. 方式 1 : 命令行

```js
*    "build"  : "webpack ./mian.js" --mode development
*     npm run build
*   一般情况下 : 改为
*     "build" : 入口  --output 出口
*     "build": "webpack ./src/js/main.js --output ./dist/bundle.js  --mode development",
*
*     验证 : index.html 引入 bundle.js
```

4. 方式 2 : 配置项

```js
第一步 : 项目`根目录`下, 创建一个 `webpack.config.js`文件 (文件名固定死)
         专门指定其他文件 : --config  webpack.XX.js
第二步 : 在 `webpack.config.js` 中,进行配置
// webpack 是基于 node的 , 所以配置文件符合 node 方式书写配置
// 注意 : 不要再这个文件中使用ES6的的模块化 import语法
// main.js里可以使用,是因为要通过webpack转化为es5的
// 而这个是webpack 的配置文件,,它是要转化别人的,所以必须要通过
第三步 : 修改 `package.json` 中的 `scripts` , 脚本命令为： "build": "webpack"
第四步 : 执行命令 : `npm run build`
```

5. 示例代码(webpack.config.js) :

```js
const path = require('path')

module.exports = {
  // 入口
  entry: path.join(__dirname, './src/js/main.js'),
  // 出口
  output: {
    // 出口目录
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // 开发模式
  mode: 'development'
}
```



## webpack 第二阶段 webpack 配置文件 html-webpack-plugin

1. html-webpack-plugin 必备的插件

```js
作用 :
  1. 能够根据指定的模板文件 (index.html),自动生成一个新的 index.html,并且注入到dist文件夹下
  2. 能够自动引入js文件
```

1. 安装 : `npm i html-webpack-plugin`
2. 配置 :

```js
第一步: 引入模块
const htmlWebpackPlugin = require('html-webpack-plugin')
第二步: 配置
// 插件
plugins: [
  // 使用插件 指定模板
  new htmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html')
  })
]
```



## webpack 第二阶段 webpack 配置文件 : webpack-dev-server 

1. **webpack-dev-server** 使用 webpack 必备的功能(插件)

> 作用 : 为使用 webpack 打包提供一个服务器环境

- 1.1 自动为我们的项目创建一个服务器
- 1.2 自动打开浏览器
- 1.3 自动监视文件变化,自动刷新浏览器...

2. 使用步骤 :

- 2.1 安装 : `npm i -D webpack-dev-server`
- 2.2 两种使用方式: 1-命令行 2-配置文件(推荐)

3. 方式 1 : 命令行配置

- 脚本 : `"dev" : "webpack-dev-server"`
- 运行到 `npm run dev`
- 查看路径 : "http://localhost:8080/"
- ｢wds｣: Project is running at http://localhost:8080/
- 问题 1 : 自动打开?
- 解决 : 添加 `--open`
- 问题 2 : 指定端口号
- 解决 : 添加 `--port 3001`
- 问题 3 : 热更新
- 解决 : `--hot` ( 整个页面和整个项目打包 )

4. 方式 2 : 配置文件配置

```js
// hot 不要写在配置文件里面,,不然的话还要配其他插件麻烦
 "dev" : "webpack-dev-server --hot",

  devServer : {
    open : true,
    contentBase : path.join(__dirname,'./src'),
    port : 3001
  }
```

## webpack 第三阶段 项目打包上线的说明

1. 开发模式 : `npm run dev`
2. 假设项目开发完成了,要上线,怎么操作?

```js
2.1 执行 : `npm run build` 对项目进行打包,生成dist文件
2.2 模拟本地服务器 : 安装 : `npm i -g http-server`
2.3 把dist文件里的内容放到服务器里即可, 直接运行`http-server`
```

## webpack 第四阶段 : 打包非js文件

> webpack 只能处理 js 文件,非 js(css.less.图片.字体等)处理处理不了, 借助 loader 加载器

## webpack 第四阶段 1 : 处理 css 文件

1. 创建一个 css 文件, 然后在 `main.js`中引入 `import '../css/index.css';`

   > ul { style-list : none }

2. 安装 : `npm i -D style-loader css-loader`

3. 在 `webpack.config.js` 中,添加个新的配置项 `module`

4. 在 `module` 中添加 `loader` 来处理 `css`

```js
// loader
module: {
  rules: [
    //1.处理 css
      // 注意点 use执行loader 顺序 从右往左
      // css-loader  :  读取css文件内容,将其转化为一个模块
      // style-loader :拿到模块, 创建一个style标签,插入页面中
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ]
}
```

## webpack 第四阶段 2 : 处理 less 文件

1. 创建一个 less 文件, 然后再 main.js 中 引入 `import '../css/index.less';`
2. 安装 : `npm i -D less-loader less style-loader css-loader`
3. 在 webpack.config.js 中, 配置 `module->rules`
4. 在 module 中, 添加 loader 来处理 `less`

```less
ul {
  background-color: aqua;
  li {
    &:hover {
      color: yellow;
    }
  }
}
```

5. 配置 : 

   ```js
    { test :/\.less$/, use : ['style-loader','css-loader','less-loader'] },
   ```



## webpack 第四阶段 3 : 处理 图片 文件

> <div class='cls1'></div>
>
> 设置背景图片
>
> .cls {
>
> width: 300px;
>
> height: 300px;
>
> background: url('../css/4.jpg');
>
> background-size: 100%;
>
> }

1. 安装 : `npm i -D url-loader file-loader`

   > url-loader (推荐) 和 file-loader 二选一即可

2. 在 webpack.config.js 添加 loader 规则

```js
// 处理图片
  { test : /\.(jpg|png)$/, use : ['url-loader'] },
```

3. **url-loader** 默认会将图片转化为 base64 编码格式, 目的:提高性能
4. **file-loader** 在车里图片时, 会对文件进行重命名 :

```js
原始：    background-image: url(../images/1.jpg);
处理后：  background-image: url(9c9690b56876ea9b4d092c0baef31bb3.jpg);
```

5. **base64 编码格式的图片说明 :**

- 精灵图 : 将一些小图片合并为一张图片,减少请求次数,提高性能
- 字体图标 :直接将一些小的图片,合并到字体文件中,并且不会失真
- base64 : 是一种编码格式,能够将图片、文字等常见的文件,转化为 base64 格式,这种字符串格式, 浏览器能够识别并且读取显示到页面中;
- base64 是一个字符串,也可以直接被内嵌到页面中, 或者 css 中
- 注意 : 大图片不适合用 base64 处理, 只有小的图标才适合 base64 处理

6. 设置配置

```js
方式1 :{ test : /\.(jpg|png)$/, use : ['url-loader?limit=57417'] }, 
方式2 : 
{
        test: /\.(jpg|png)$/, use: [
          {
            loader: 'url-loader',
            options: {
              //  比57417这个小 => 转化为base64
              //  大于等于这个57417值 => 不会转base64 内部调用 file-loader 加载图片
              limit: 57417
            }
          }
        ]
      },
```

## webpack 第四阶段 4 : 处理 字体 文件

1. 准备字体图标: 字体图标文件 `iconfont` 或者 从`阿里矢量图标`里下载

2. 拷贝到项目中的 css 文件夹中

3. 在 **main.js** 中引入 css 文件

   ```js
   import '../css/iconfont/iconfont.css'
   ```

4. 使用 : **<i class="iconfont icon-zan"></i>**

5. 在 webpack.config.js 中配置

```js
 // 4. 处理字体图标
  { test:/\.(svg|woff|woff2|ttf|eot)$/,use:'url-loader'}
```

## webpack 第四阶段 5 : 处理 ES6 语法

1. 现在的项目都是使用 ES6 开发的, 但是这些新的 ES6 语法, 并不是所有的浏览器都支持, 所以就需要有一个工具,帮我们转成 es5 语法, 这个就是: babel
2. [babel](https://babeljs.io/)
3. Babel is a JavaScript compiler. ==> babel 是一个 JavaScript 编译器
4. webpack 只能处理 import / export 这个 es6 模块化语法
   而其他的 js 新语法,应该使用 babel 来处理
5. 比如 : `var o = { ...obj }` 在谷歌上可以,edge 就不可以
6. babel 的使用 :

- 6.1 安装 1 : `npm i -D babel-core babel-loader@7`
  - babel-core 是 babel 的核心包
  - babel-loader 加载 js 文件, 并将 js 代码内容交给 babel-core 解析为 es5 低版本的 js
- 6.2 安装 2 : `npm i -D babel-preset-env babel-preset-stage-2`
  - babel-preset-\* 表示能够解析什么版本的 js 语法
  - babel-preset-env : 表示能够解析 es2015,es2016,es2017,es2018 这些标准的语法
  - babel-preset-stage-2 : 用来解析经过会遇到,但是还没有被采纳为标准的语法
  - 比如 : 'abc'.padStart(10, '6') : 准备 10 位字符,有 abc,前面不够用 6 补充,是 es2017 的语法,
  - `babel-polyfill与babel-plugin-transform-runtime` 也是做兼容处理的,以前都是用这个,兼容更早的
- 6.3 配置 : 在 webpack.config.js 中添加一个 loader

```js
  { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
```

- 6.4 在项目根目录中创建 babel 的配置文件，叫：`.babelrc`

```js
  {
  "presets": [
    "env",
    "stage-2"
  ],

  -----------
  // 暂时不用
  // 如果未来某一天真的用到了polify
    "plugins": [
        ["transform-runtime", {
                "helpers": false,
                "polyfill": true,
                "regenerator": true,
                "moduleName": "babel-runtime"
    }]
```

- 6.5 测试 : 谷歌 和 edge

```js
var obj = {
  name: 'zs',
  age: 20
}

var o = { ...obj }
console.log(o)
```