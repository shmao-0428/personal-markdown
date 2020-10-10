# 什么是链式判断运算符

> Optional Chaining Operator（?.）  ：直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

如果要访问一个比较长的对象属性例如：Obj.userInfo.userName
在es5要这样判断

```js
const userName = Obj &&
	Obj.userInfo && 
	Obj.userInfo.userName ；//这样判断是不是很繁琐
```

所以es6(es2020)引入链式判断运算符
es6写法

```js
const userName = Obj?.userInfo?.userName; 
```

# vue中如何配置

### 如何在项目中支持可选链

#### 1. 安装依赖（Babel）

为了避免出现兼容问题，装好对应的转换器

```cmd
λ npm install @babel/plugin-proposal-optional-chaining
```

#### 2.添加至项目.babel.config.js文件中：

```js
module.exports = {
  "plugins": [
    "@babel/plugin-proposal-optional-chaining"
  ]
}

```

