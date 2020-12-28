# Vue3

## 1. vue3的6大亮点

- performance: 性能比vue2.x快`1.2~2`倍
- tree shaking support: 按需编译 ,体积比vue2更小
- composition api: 组合api(类似react hooks)
- better typescript support: 更好的ts支持
- custom renderer api: 暴露了自定义渲染api
- fragment,teleport,suspense: 更先进的组件

## 2. vue3 是如何变快的

- diff算法优化

  - vue2中的虚拟dom是进行全量的对比

    - <img src="images\vue2对比vue3 diff.jpg" alt="vue2对比vue3 diff" style="zoom:50%;" />

    - ```html
      <div id="app">
        <div>Hello World!</div>
        <div>{{msg}}</div>
      </div>
      ```

    - ```js
      function render() {
        with(this) {
          return _c('div', {
            attrs: {
              "id": "app"
            }
          }, [_c('div', [_v("Hello World!")]), _c('div', [_v(_s(msg))])])
        }
      }
      ```

  - [vue3新增了静态标记(`PatchFlag`) ](https://vue-next-template-explorer.netlify.app/)

    - 在于上次虚拟节点进行对比的时候, 只对比带有patchflag的节点

    - 并且可以通过flag的信息得知当前节点要对比的具体内容

    - ```html
      <div>Hello World!</div>
      <div>{{msg}}</div>
      ```

    - ```js
      import { createVNode as _createVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "vue"
      /* 静态提升之前 */
      export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock(_Fragment, null, [
          _createVNode("div", null, "Hello World!"),
          _createVNode("div", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
        ], 64 /* STABLE_FRAGMENT */))
      }
      
      // Check the console for the AST
      ```

    - ![](images\PatchFlag.jpg)

- hoistState 静态提升

  - vue2中无论元素是否参与更新,每次都会重新创建

  - vue3中对于不参与更新的元素, 只会被创建一次, 之后会在每次渲染的时候不停的复用

  - 静态提升之后

    - ```html
      <div>Hello World!</div>
      <div>Hello World!</div>
      <div>{{msg}}</div>
      ```

    - ```js
      import { createVNode as _createVNode, toDisplayString as _toDisplayString, Fragment as _Fragment, openBlock as _openBlock, createBlock as _createBlock } from "vue"
      
      const _hoisted_1 = /*#__PURE__*/_createVNode("div", null, "Hello World!", -1 /* HOISTED */)
      const _hoisted_2 = /*#__PURE__*/_createVNode("div", null, "Hello World!", -1 /* HOISTED */)
      
      export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock(_Fragment, null, [
          _hoisted_1,
          _hoisted_2,
          _createVNode("div", null, _toDisplayString(_ctx.msg), 1 /* TEXT */)
        ], 64 /* STABLE_FRAGMENT */))
      }
      
      // Check the console for the AST
      ```

      

- cacheHandlers 事件监听器缓存

  - 默认情况下onClick事件会被视为动态绑定, 所以每次都会去追踪她的变化,但是因为是同一个函数,所以没有追踪变化,直接缓存起来复用即可

  - 事件模板

    - ```html
      <div>
        <button @click="onClick">点击</button>
      </div>
      ```

  - 缓存之前

    - ```js
      import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
      
      export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock("div", null, [
          _createVNode("button", { onClick: _ctx.onClick }, "点击", 8 /* PROPS */, ["onClick"])
        ]))
      }
      
      // Check the console for the AST
      ```

  - 缓存之后

    - ```js
      import { createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
      
      export function render(_ctx, _cache, $props, $setup, $data, $options) {
        return (_openBlock(), _createBlock("div", null, [
          _createVNode("button", {
            onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.onClick && _ctx.onClick(...args)))
          }, "点击")
        ]))
      }
      
      // Check the console for the AST
      ```

      

- ssr 渲染

  - 当有大量静态的内容的时候, 这些内容会被当做纯字符串推进一个`buffer`里面, 即使存在动态的绑定, 会通过模板插值嵌入进去. 这样会比通过虚拟dom来渲染的快上很多很多;
  - 当静态内容大到一定量级的时候, 会用`_createStaticVNode`方法在客户端去生成一个`static node`, 这些静态node, 会被innerHTML, 就不需要创建对象, 然后根据对象渲染.

​	



# 参考链接

1. [vue3](vue3js.cn/docs/zh/guide/migration/introduction.html#概览)
2. [深入理解vue3 reactivity api](https://www.bilibili.com/video/BV14k4y117LL?p=2)

3. [李南江vue3](https://www.bilibili.com/video/BV14k4y117LL?p=2)