# 前端路由的原理解析

- 为什么使用 replaceState 方法?
  - 因为 replaceState 方法没有历史记录

我们在http://127.0.0.1:5500/page2页面下输入

```js
history.replaceState(null, '', 'http://127.0.0.1:5500/page3');
```

页面路径http://127.0.0.1:5500/page3, 但是不会刷新页面, 此时点击 page1, 再点击浏览器返回按钮, 此时返回的应该是 page2 页面, 但是返回的是 路径 page3

> **popState 方法**
>
> 当活动历史记录条目更改时，将触发 popstate 事件。如果被激活的历史记录条目是通过对 history.pushState（）的调用创建的，或者受到对 history.replaceState（）的调用的影响，popstate 事件的 state 属性包含历史条目的状态对象的副本。
> 需要注意的是调用 history.pushState()或 history.replaceState()不会触发 popstate 事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在 Javascript 代码中调用 history.back()或者 history.forward()方法）
> 不同的浏览器在加载页面时处理 popstate 事件的形式存在差异。页面加载时 Chrome 和 Safari 通常会触发(emit )popstate 事件，但 Firefox 则不会。

# 参考链接

[你好，谈谈你对前端路由的理解](https://juejin.cn/post/6917523941435113486?utm_source=gold_browser_extension#heading-3)
