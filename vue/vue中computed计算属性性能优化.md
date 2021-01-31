局部变量，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/local-var)。

优化前的组件代码如下：

```html
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result () {
      let result = this.start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(this.base))) + this.base * this.base + this.base + this.base * 2 + this.base * 3
      }
      return result
    },
  },
}
</script>
复制代码
```

优化后的组件代码如下：

```html
<template>
  <div :style="{ opacity: start / 300 }">{{ result }}</div>
</template>

<script>
export default {
  props: ['start'],
  computed: {
    base () {
      return 42
    },
    result ({ base, start }) {
      let result = start
      for (let i = 0; i < 1000; i++) {
        result += Math.sqrt(Math.cos(Math.sin(base))) + base * base + base + base * 2 + base * 3
      }
      return result
    },
  },
}
</script>
```

这里主要是优化前后的组件的计算属性 `result` 的实现差异，优化前的组件多次在计算过程中访问 `this.base`，而优化后的组件会在计算前先用局部变量 `base`，缓存 `this.base`，后面直接访问 `base`。

那么为啥这个差异会造成性能上的差异呢，原因是你每次访问 `this.base` 的时候，由于 `this.base` 是一个响应式对象，所以会触发它的 `getter`，进而会执行依赖收集相关逻辑代码。类似的逻辑执行多了，像示例这样，几百次循环更新几百个组件，每个组件触发 `computed` 重新计算，然后又多次执行依赖收集相关逻辑，性能自然就下降了。

从需求上来说，`this.base` 执行一次依赖收集就够了，把它的 `getter` 求值结果返回给局部变量 `base`，后续再次访问 `base` 的时候就不会触发 `getter`，也不会走依赖收集的逻辑了，性能自然就得到了提升。

这是一个非常实用的性能优化技巧。因为很多人在开发 Vue.js 项目的时候，每当取变量的时候就习惯性直接写 `this.xxx` 了，因为大部分人并不会注意到访问 `this.xxx` 背后做的事情。在访问次数不多的时候，性能问题并没有凸显，但是一旦访问次数变多，比如在一个大循环中多次访问，类似示例这种场景，就会产生性能问题了。

我之前给 ZoomUI 的 Table 组件做性能优化的时候，在 `render table body` 的时候就使用了局部变量的优化技巧，并写了 benchmark 做性能对比：渲染 1000 * 10 的表格，ZoomUI Table 的更新数据重新渲染的性能要比 ElementUI 的 Table 性能提升了近一倍。


链接：https://juejin.cn/post/6922641008106668045
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。