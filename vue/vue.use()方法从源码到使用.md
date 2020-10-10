# vue.use()方法从源码到使用

### 关于 vue.use 我们都知道些什么？

在做 vue 开发的时候大家一定经常接触 `Vue.use()` 方法，官网给出的解释是: *通过全局方法 `Vue.use()` 使用插件*；我觉得把使用理解成注册更合适一些，首先看下面常见的注册场景。

```javascript
import Router from 'vue-router'
Vue.use(Router)

import Vuex from 'vuex'
Vue.use(Vuex)

import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts
复制代码
```

关于 echarts 的注册很简单，直接挂在 Vue 方法的原型上，通过原型链继承的关系可以在任意一个组件里通过 `this.$echarts` 访问到 echarts 实例，我们来写一个简单的例子证明一下。

```javascript
function myVue(title){
  this.title = title
}
myVue.prototype.myUse = '在原型上添加公共属性'
const A = new myVue('我是实例A')
const B = new myVue('我是实例B')
console.log(A.title, B.title, A.myVue, B.myVue, )
// 我是实例A 我是实例B 在原型上添加公共属性 在原型上添加公共属性
复制代码
```

而 Router 和 Vuex 的注册就要去分析 `Vue.use()` 的源码了，在分析源码之前先总结一下官方对 `Vue.use()` 方法的说明：

- 通过全局方法 `Vue.use()` 使用插件
- Vue.use 会自动阻止多次注册相同插件
- 它需要在你调用 new Vue() 启动应用之前完成
- `Vue.use()` 方法至少传入一个参数，该参数类型必须是 Object 或 Function，如果是 Object 那么这个 Object 需要定义一个 install 方法，如果是 Function 那么这个函数就被当做 install 方法。在 `Vue.use()` 执行时 install 会默认执行，当 install 执行时第一个参数就是 Vue，其他参数是 `Vue.use()` 执行时传入的其他参数。

官网说 `Vue.use()` 是用来使用插件的，那么传入的 Router 和 Vuex 就是这里指的插件，而这个插件本质上又是一个 install 方法。至于 install 方法内部实现了什么逻辑就由插件自身的业务决定了。

### 源码分析

*首先说一下 Flow，vue源码中那些奇怪的写法 `Vue.use = function (plugin: Function | Object)` 是 Flow 的语法，Flow 是 facebook 出品的 JavaScript 静态类型检查工具。JavaScript 是动态类型语言，它的灵活性有目共睹，但是过于灵活的副作用是很容易就写出非常隐蔽的隐患代码，在编译期甚至看上去都不会报错，但在运行阶段就可能出现各种奇怪的 bug。*

下面我们正式开始分析源码，`Vue.use()` 的源码很简单30行都不到，首先看 src/core/global-api/use.js 下 `Vue.use()` 方法的定义：

```javascript
import { toArray } from '../util/index'
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
复制代码
```

上面源码中使用了工具函数 `toArray` ，该函数定义在 src/shared/util.js

```javascript
export function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
复制代码
```

了解一下源码实现了什么逻辑

`Vue.use = function (plugin: Function | Object) {`
在全局api Vue 上定义了 use 方法，接收一个 plugin 参数可以是 Function 也可以是 Object，这就和前面官方规定的 `Vue.use()` 第一个参数要求的类型对应上了。

`if (installedPlugins.indexOf(plugin) > -1) {`
用来判断该插件是不是已经注册过，防止重复注册。

`const args = toArray(arguments, 1)`
arguments是 `Vue.use()` 方法的参数列表是一个类数组，后面的 1 先理解成一个常量，toArray 方法的作用就是把第一个 Array 参数从下标为1截取到最后。也就拿到了 `Vue.use()` 方法除去第一个之外的其他参数，这些参数准备在调用 instll 方法的时候传入。

`if (typeof plugin.install === 'function') {`
`} else if (typeof plugin === 'function') {`
这里的if语句是判断 `Vue.use()` 传入的第一个参数是 Object 还是 Function。

`plugin.install.apply(plugin, args)`
`plugin.apply(null, args)`
判断完之后执行那个对应的 install 方法，用 apply 改变 this 指向，并把 toArray 得到的剩余参数传入。

`installedPlugins.push(plugin)`
最后记录该组件已经注册过了

*现在我们发现 `Vue.use()` 的注册本质上就是执行了一个 install 方法，install 里的内容由开发者自己定义，通俗讲就是一个钩子可能更贴近语义化而已。*

### Vue.use()有什么用

在 install 里我们可以拿到 Vue 那么和 Vue 相关的周边工作都可以考虑放在 `Vue.use()` 方法里，比如：

- directive注册
- mixin注册
- filters注册
- components注册
- prototype挂载
- ...

### echarts 用 Vue.use() 来注册

main.js

```javascript
import Vue from 'vue'
import echarts from './echarts.js'
Vue.use(echarts)

new Vue({
  ...
})
复制代码
```

echarts.js

```javascript
import Echarts from 'echarts'
export default {
  install(Vue){
    Vue.prototype.$echarts = Echarts
  }
}
复制代码
```

*这样写的好处是可以在 install 的文件里做更多配置相关的工作，main.js 不会变的臃肿，更方便管理。*

### 全局组件用 Vue.use() 来注册

base.js

```javascript
import a from './a'
import b from './b'
let components = { a, b }
const installBase = {
  install (Vue) {
    Object.keys(components).map(key => Vue.component(key, components[key]))
  }
}
```

main.js

```javascript
import Vue from 'vue'
import base from './base.js'
Vue.use(base)

new Vue({
  ...
})
```

`文章取自:` https://juejin.im/post/6844903842035793928