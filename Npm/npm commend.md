## 淘宝镜像

### 临时使用

```js
npm --registry https://registry.npm.taobao.org install express
```

### 永久使用

```js
npm config set registry https://registry.npm.taobao.org
```

### 配置CNPM

这样的话，你用npm走的还是官方的，cnpm走的代理

```js
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 恢复使用

```js
npm config set registry https://registry.npmjs.org
```

### 验证是否设置成功

```js
npm info express
or
npm config get registry
```

![image.png](https:////p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/844cb3c946c94395993c81034e007e39~tplv-k3u1fbpfcp-zoom-1.image)

## NPM相关命令

> 整理 npm 常用的一些命令，方便查看

### 持续更新npm

你可以通过下面的命令显示npm当前的版本：

```js
npm -v
```

如果有需要，可以通过下面的命令更新npm：

```js
npm install -g npm
```

当 Node 的主版本 released 之后，你也可能需要重新构建 C++ 扩展：

```js
npm rebuild
```

如果你需要管理多个版本的node.js和npm，可以考虑使用 n 或者 nvm，[www.sitepoint.com/quick-tip-m…](https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/)，我推荐大家使用nvm去管理node.js版本

### 卸载

如需删除 node_modules 目录下面的包（package），请执行：

npm uninstall :

```js
npm uninstall lodash
```

如需从 package.json 文件中删除依赖，需要在命令后添加参数 --save:

```js
npm uninstall --save lodash
```

注意：如果你将安装的包作为 "devDependency"（也就是通过 --save-dev 参数保存的），那么 --save 无法将其从 package.json 文件中删除。所以必须通过 --save-dev 参数可以将其卸载。

### 更新包

```js
npm update package    #更新局部模块

npm update -g package    #更新全局模块

npm update -g package@version   #更新全局模块 package-name 到 x.x.x 版本
```

### npm owner

```js
# 模块的维护者可以发布新版本。npm owner命令用于管理模块的维护者。

# 列出指定模块的维护者
$ npm owner ls <package name>

# 新增维护者
$ npm owner add <user> <package name>

# 删除维护者
$ npm owner rm <user> <package name>
```

### 指定版本	

```js
npm view react versions    查看包在npm所有版本

npm i vue@2.0.0 --save    安装指定版本
```

### 使用开发中的模块

当你正在开发一个模块时，会经常想在其它项目中尝试使用或者在任何一个目录运行它(如果你的应用支持)，这时没必要将其发布到 npm，并全局安装---仅需在该模块所在目录使用下面的命令：

```js
npn list
```

该命令会为模块在全局目录下创建一个符号链接。可以通过下面的命令查看模块引用：

```js
npm list -g --depth=0
```

或者：

```js
npm outdated -g
```

现在，就可以从命令行运行模块或者通过 require 在任何项目中引入该模块。

另一个选择是，可以通过文件路径在 package.json 文件中声明对该模块的依赖：

```js
"dependencies": {
  "myproject": "file:../myproject/"
}
```

### 常见通用命令

```js
npm bin # npm bin命令显示相对于当前目录的，Node模块的可执行脚本所在的目录（即.bin目录）。
 
npm root    #查看本地安装的目录

npm root -g    #查看全局安装的目录

npm info package    #查看包信息

npm ls    #查看本地安装包

npm ls -g    #查看全局安装包，包含依赖

npm ls -g --depth 0    #查看全局安装包，不包含依赖

npm outdated    #列出所有不是最新版的包，可以带参数

npm cache clean    #清除本地缓存

npm config ls -l    #查看npm配置

npm view package versions    #查看包的所有版本

npm adduser # npm publish用于将当前模块发布到npmjs.com。执行之前，需要向npmjs.com申请用户名。

npm login # 登录 

npm publish     #发布包

npm access    #设置发布包的访问级别

npm search modulNmae   #搜索包是否存在

npm deprecate # 废弃某个版本的模块

#如果当前模块是一个beta版，比如1.3.1-beta.3，那么发布的时候需要使用tag参数，将其发布到指定标签，默认的发布标签是latest。
npm publish --tag beta

#如果发布私有模块，模块初始化的时候，需要加上scope参数。只有npm的付费用户才能发布私有模块
npm init --scope=<yourscope>
```

### 语法转换

如果你的模块是用ES6写的，那么发布的时候，最好转成ES5。首先，需要安装Babel。

```
npm install --save-dev babel-cli@6 babel-preset-es2015@6
```

然后，在`package.json`里面写入`build`脚本。

```js
"scripts": {
  "build": "babel source --presets babel-preset-es2015 --out-dir distribution",
  "prepublish": "npm run build"
}
```

运行上面的脚本，会将`source`目录里面的ES6源码文件，转为`distribution`目录里面的ES5源码文件。然后，在项目根目录下面创建两个文件`.npmignore`和`.gitignore`，分别写入以下内容。

```
// .npmignore
source

// .gitignore
node_modules
distribution
```

### 通配符

npm的通配符的规则如下。

- `*` 匹配0个或多个字符
- `?` 匹配1个字符
- `[...]` 匹配某个范围的字符。如果该范围的第一个字符是`!`或`^`，则匹配不在该范围的字符。
- `!(pattern|pattern|pattern)` 匹配任何不符合给定的模式
- `?(pattern|pattern|pattern)` 匹配0个或1个给定的模式
- `+(pattern|pattern|pattern)` 匹配1个或多个给定的模式
- `*(a|b|c)` 匹配0个或多个给定的模式
- `@(pattern|pat*|pat?erN)` 只匹配给定模式之一
- `**` 如果出现在路径部分，表示0个或多个子目录。

## package.json参数介绍

说完了npm，自然也得说下package.json文件的作用，以及说明

### key字段介绍

```js
name - 包名

version - 包的版本号

description - 包的描述

homepage - 包的官网 url 

author - 包的作者姓名

contributors - 包的其他贡献者姓名

dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下

repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上

main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")

keywords - 关键字
```

### npm i 选项–global，–save，–save-dev

```js
-global: 简写 -g

    npm i express -g 为全局安装，这种就可以直接使用express命令, 否则会提示express不是内部或外部命令

-save: 简写 -S, 作用是在package.json的dependencies字段增加或修改安装包和版本号

-save-dev: 简写 -D, 是修改devDependencies, 这样就不用安装了某个包之后手动修改package.json
```

### ~ 与 ^ 版本

```js
版本分为: 主版本号、次版本号、补丁版本号

"devDependencies": {
    "vue": "~2.2.2",            // 匹配最近小版本，如，会匹配所有的2.2.x版本，但最高不会匹配2.3.0
    "vue-router": "^2.2.0"        // 最近的一个大版本，所有 2.x.x但不不包括3.0.0，相当于 2.0.0 <= version < 3.0.0
}
```

### script属性

```js
script属性定义的对应了一段shell脚本

npm start 启动模块

    该命令写在package.json文件scripts的start字段中，可以自定义命令来配置一个服务器环境和安装一系列的必要程序

    "scripts": {
        "start": "gulp -ws"
    }

npm stop 停止模块

npm restart 重新启动模块

你可能在开发中用到是用npm run xxx，之类的，start ，stop，restart 是几个通用命令，阔以不用加run

npm start === npm run start
```



## 参考文献

1. [如何正确使用淘宝npm镜像](https://juejin.im/post/6880719617317142536)
2. [npm模块管理器来自《JavaScript 标准参考教程（alpha）》 阮一峰](https://javascript.ruanyifeng.com/nodejs/npm.html)

