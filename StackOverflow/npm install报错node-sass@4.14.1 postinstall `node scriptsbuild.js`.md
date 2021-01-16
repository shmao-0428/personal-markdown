# npm install报错node-sass@4.13.1 postinstall: `node scripts/build.js`

在下载[项目](https://github.com/mgbq/nx-admin)依赖遇到这个错误

一开始看Error信息：
Error: Can’t find Python executable “python”, you can set the PYTHON env variable.
没有python，太奇怪了，然后找了各种方法也没有解决

后来看可能还是因为node-sass报错：
node-sass@4.13.1 postinstall: `node scripts/build.js`

这可能是因为sass安装时获取源问题，先改sass安装源，在npm install就行了

```js
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
```

发现还是不行

最后通过`yarn add node-sass`

```js
Syntax Error: Error: Node Sass version 5.0.0 is incompatible with ^4.0.0.
# 语法错误:错误:节点5.0.0 Sass版本不兼容^ 4.0.0。
```

原因是项目的sass是4的版本

最后通过`yarn add node-sass@4.13.1`

然后又报

```js
Syntax Error: Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (83)
For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v4.13.1
```

然后我去https://github.com/sass/node-sass/releases/tag/v4.13.1发现对`node`对`node-sass@4.13.1`的支持只到了13版本,而我的`node`版本`v14.15.3`, yarn版本`1.22.10`,  `npm`的版本`6.14.9`

所以...

我下载了当前`node`环境支持的[node-sass@4.14.1](https://github.com/sass/node-sass/releases/tag/v4.14.1)解决了问题 :smile:
