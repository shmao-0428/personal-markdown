## Deferred features

使用 `Deferred` 组件延时分批渲染组件，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/deferred)。

优化前的组件代码如下：

```html
<template>
  <div class="deferred-off">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <Heavy v-for="n in 8" :key="n"/>

    <Heavy class="super-heavy" :n="9999999"/>
  </div>
</template>
复制代码
```

优化后的组件代码如下：

```html
<template>
  <div class="deferred-on">
    <VueIcon icon="fitness_center" class="gigantic"/>

    <h2>I'm an heavy page</h2>

    <template v-if="defer(2)">
      <Heavy v-for="n in 8" :key="n"/>
    </template>

    <Heavy v-if="defer(3)" class="super-heavy" :n="9999999"/>
  </div>
</template>

<script>
import Defer from '@/mixins/Defer'

export default {
  mixins: [
    Defer(),
  ],
}
</script>
```

优化前后的差距主要是后者使用了 `Defer` 这个 `mixin`，那么它具体是怎么工作的，我们来一探究竟：

```js
export default function (count = 10) {
  return {
    data () {
      return {
        displayPriority: 0
      }
    },

    mounted () {
      this.runDisplayPriority()
    },

    methods: {
      runDisplayPriority () {
        const step = () => {
          requestAnimationFrame(() => {
            this.displayPriority++
            if (this.displayPriority < count) {
              step()
            }
          })
        }
        step()
      },

      defer (priority) {
        return this.displayPriority >= priority
      }
    }
  }
}
复制代码
```

`Defer` 的主要思想就是把一个组件的一次渲染拆成多次，它内部维护了 `displayPriority` 变量，然后在通过 `requestAnimationFrame` 在每一帧渲染的时候自增，最多加到 `count`。然后使用 `Defer mixin` 的组件内部就可以通过 `v-if="defer(xxx)"` 的方式来控制在 `displayPriority` 增加到 `xxx` 的时候渲染某些区块了。

当你有渲染耗时的组件，使用 `Deferred` 做渐进式渲染是不错的注意，它能避免一次 `render` 由于 JS 执行时间过长导致渲染卡住的现象。


链接：https://juejin.cn/post/6922641008106668045
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。