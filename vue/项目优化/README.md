# 项目优化

## 插件

- [webpack中文文档地址4.15](https://webpack.html.cn/plugins/context-replacement-plugin.html)
- [webpack中文文档地址5.0](https://www.webpackjs.com/plugins/context-replacement-plugin/)

### webpack-bundle-analyzer
vue.config.js
```js
chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./src/main.js');

    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
}
```
package.json
```json
"analyzer": "cross-env use_analyzer=true npm run build",
```
### script-ext-html-webpack-plugin
### html-webpack-plugin
### DefinePlugin
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

plugins: [
    new HtmlWebpackPlugin({
      title: '智医工作站',
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': { mode: '"dev"' },
    })
],
```



## moment
- [webpack中文文档地址4.15](https://webpack.html.cn/plugins/context-replacement-plugin.html)

## sass

## svg

### 使用
/icons/index.js
```js
import Vue from 'vue';
import SvgIcon from '@/components/svg-icon';// svg component

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);

const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
```
/components/svg-icon.vue
```js
<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners" />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate';

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className;
      } else {
        return 'svg-icon';
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>

```

vue.config.js
```js
config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
```

#### 参考链接
1. [vue-cli4项目中使用svg图标](https://blog.csdn.net/weixin_43250576/article/details/106462494)



### [转iconfont](https://www.iconfont.cn/icons/upload?spm=a313x.7781069.1998910419.d059fa781)


### 压缩
https://www.zhangxinxu.com/sp/svgo/

## 图片

### 压缩
https://tinypng.com/




## 装饰器
.eslintrc.js
```js
parserOptions: {
    ecmaFeatures: {
      // 支持装饰器
      legacyDecorators: true,
    },
},
```

## .vscode
```json
{
  "files.autoSave": "off",
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.html": "none",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "git.ignoreLimitWarning": true,
  "javascript.implicitProjectConfig.experimentalDecorators": true,
  "javascript.validate.enable": false,
  "vetur.validation.script": false
}
```