# 智医助理4.0 WEB 基座应用

## 安装

```cli
  npm install
```

## 运行

```cli
  npm run serve
```
## 访问

`http://localhost:9000/`

## 应用信息

| 应用                 | 本地端口   | 生产路径                    |  介绍    |
| --------------       | -----     | -------------------------- | ------   |
| ima-spa-base         | 9000      | domain/ima-spa-base        | 基座     |
| ima-spa-common       | 9001      | domain/ima-spa-common      | 公共应用 |
| ima-spa-outpatient   | 10000     | domain/ima-spa-outpatient  | 门诊     |
| ima-spa-technology   | 10001     | domain/ima-spa-technology  | 医技     |
| ima-spa-ims          | 10002     | domain/ima-spa-ims         | 物资管理  |
| ima-spa-hospital     | 10003     | domain/ima-spa-hospital    | 住院     |

## 开发流程

### 依赖包
| 包名                 | 介绍                   |  所属    |
| -------------------- | ------------------------- | ------   |
| single-spa-vue       | vue项目集成微前端框架       | 第三方     |
| ScriptExtHtmlWebpackPlugin | 增强html-webpack-plugin插件 | 第三方 |
| cross-env |||
| @ima/ui   |   智医工作站业务组件库   | IMA |
| @ima/style   | 智医工作站公共样式库 |   IMA   |
| @ima/utils   | 智医工作站工具库 |   IMA   |

### 【基座应用】基座添加子应用配置

基座应用注册子应用，需要获取子应用的配置信息，以住院应用为例：


```js
{
  name: 'ima-spa-hospital',
  base: false,
  path: '#/hospital',
  domID: 'ima-spa-main',
  projectIndex:
    process.env.mode === 'prod'
      ? '/ima-spa-hospital/'
      : 'http://localhost:10003',
},
```

具体字段参考如下：
|字段|类型|是否必填|可选值|默认值|描述|
|----|----|----|----|---|----|
|name|String|是|-|-|项目名|
|projectIndex|String|是|-|-|项目访问入口|
|base|Boolean|否|true,false|false|是否需要一直在页面中显示|
|path|[String,Array]|否|-|[]|项目的显示条件，当base为true时，path的值会被忽略|
|routeMode|String|否|hash，history|hash|路由模式。 routeMode 和 path 配合使用来确认项目的显示与否|
|domID|String|否|-|''|项目要挂载的dom节点的id属性|
|customProps|Object|否|-|{}|各个生命周期要传递到项目的自定义属性|


### 【子项目】改写main.js入口文件
```js
import vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/base';
import singleSpaVue from 'single-spa-vue';
import iflymedUI from 'iflymed-ui';
vue.use(iflymedUI)
vue.config.productionTip = false;
const vueLifecycles = singleSpaVue({
  Vue:vue,
  appOptions: {
    el:'#ima-spa-main', // 微前端加载入口文件的dom Id
    render: (h) => h(App),
    router,
    store
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

### 子应用添加id为ima-spa-main
```js
<div id="ima-spa-main">
  <router-view/>
</div>
```

id="ima-spa-main"

### 【子项目】抽离公共资源

配置`webpack`的 externals 字段使`webpack`在打包的时候不打包公共库如(vue, vue-router, 私有 npm 包等),如下：

```js
{
  externals:['vue', 'vue-router', 'iflymed-ui']
}
```

### 【子项目】设置项目打包格式

```js
config.output
      .libraryTarget('umd')
      .library('xxx')
      .jsonpFunction('webpackJsonp_xxx');
```

### 【子项目】给入口js加属性

经过`webpack`打包之后一个项目在 index.html 中插入的 js 脚本可能不只一个，所以在为了确保框架能够正确的从项目访问入口中解析要入口js，给入口 js 文件加上一个自定义属性

```
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
plugins:[
    ...
    new ScriptExtHtmlWebpackPlugin({
      custom: {
        test: /app.*\.js$/,
        attribute: 'entry',
        value: true
      }
    })
  ]
```

### 配置跨域访问

由于子项目的资源需要在入口项目中访问，所以需要在子项目中配置跨域访问

```cli
    devServer:{
        ...
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    },
```

### publicPath

由于子项目的资源是在入口项目(入口项目和子项目在不同的域)中访问，所以需要将子项目的 publicPath 设置为完整的路径（即：包括协议和域名），这样才能保证子项目的资源能够正确加载。[output.publicPath](https://www.webpackjs.com/configuration/output/#output-publicpath)

### 独立运行

为了让项目独立运行，可在package.json中配置如下scripts：

```js
"scripts": {
  "serve:singlerun": "cross-env VUE_APP_SINGLERUN=true vue-cli-service serve",
}
```

增加环境变量，在代码中通过`process.env.VUE_APP_SINGLERUN`决定是否new Vue()