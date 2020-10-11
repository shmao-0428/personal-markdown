# 微前端技术框架

single-spa

### 基于single-spa微前端的框架

### *@hydesign/grape*

https://www.npmjs.com/package/@hydesign/grape

> 沙盒模式实现全局变量隔离，子项目切换的过程中实现项目样式文件的移除和插入，主子应用之间的通信。通过项目的 html 得到项目的脚本和样式

### 应用间的通信

> [官网介绍](https://zh-hans.single-spa.js.org/docs/recommended-setup/#cross-microfrontend-imports)

#### Cross microfrontend imports

Example - [exporting a shared component](https://github.com/vue-microfrontends/styleguide/blob/af3eaa70bec7daa74635eb3ec76140fb647b0b14/src/vue-mf-styleguide.js#L5), [importing a shared component](https://github.com/vue-microfrontends/rate-dogs/blob/fe3196234b9cbd6d627199b03a96e7b5f0285c4b/src/components/rate-dogs.vue#L25), and [required webpack config](https://github.com/vue-microfrontends/rate-dogs/blob/97489e2acb1de44aca910ef5e3e0a9d2494200c7/vue.config.js#L14).

You can import and export functions, components, logic, data, event emitters, and environment variables between your microfrontends that are in different git repos and JavaScript bundles. Each microfrontend should have a single [entry file](https://webpack.js.org/concepts/entry-points/#root) that serves as the "public interface" that controls what is exposed outside of the microfrontend.

To make cross microfrontend imports possible, configure your bundler so that the microfrontends are treated as "externals" ([webpack docs](https://webpack.js.org/configuration/externals/#root) / [rollup docs](https://rollupjs.org/guide/en/#external)). Marking them as externals ensures that they are treated as [in-browser modules](https://zh-hans.single-spa.js.org/docs/recommended-setup/#in-browser-versus-build-time-modules) instead of build-time modules.

**比如在基座或者'navbar'的main.js这样的应用中导出**

```js
// Inside of the "entry file" for a utility module called @org-name/auth,
// expose your public interface that other microfrontends can access.
// Often this is within the main.js or main.single-spa.js file.

export function userHasAccess(permission) {
  return loggedInUser.permissions.some(p => p === permission);
}
```

**比如在业务应用'app1'的main.js中获取**

```js
import { userHasAccess } from '@org-name/auth'

// Inside of a single-spa application, import and use a util function from a different microfrontend
const showLinkToInvoiceFeature = userHasAccess('invoicing');
```

**比如在业务应用'app1'的webpack.config.js或者vue.config.js中配置**

```js
// In your webpack config, mark @org-name auth as a webpack external
module.exports = {
  externals: ['@org-name/auth'],

  // Alternatively, mark *all* org-name packages as externals
  // externals: [/^@org-name\/.+/]
}
```