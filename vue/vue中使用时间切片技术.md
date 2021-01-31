## Time slicing

使用 `Time slicing` 时间片切割技术，你可以查看这个[在线示例](https://vue-9-perf-secrets.netlify.app/bench/fetch-items)。

优化前的代码如下：

```js
fetchItems ({ commit }, { items }) {
  commit('clearItems')
  commit('addItems', items)
}
复制代码
```

优化后的代码如下：

```js
fetchItems ({ commit }, { items, splitCount }) {
  commit('clearItems')
  const queue = new JobQueue()
  splitArray(items, splitCount).forEach(
    chunk => queue.addJob(done => {
      // 分时间片提交数据
      requestAnimationFrame(() => {
        commit('addItems', chunk)
        done()
      })
    })
  )
  await queue.start()
}
复制代码
```

我们先通过点击 `Genterate items` 按钮创建 10000 条假数据，然后分别在开启和关闭 `Time-slicing` 的情况下点击 `Commit items` 按钮提交数据，开启 Chrome 的 Performance 面板记录它们的性能，会得到如下结果。

优化前：

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0e8d91db10e04e4a8992343227e52eaa~tplv-k3u1fbpfcp-watermark.image)

优化后：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5703007e2ab47ccba80107166fce5b3~tplv-k3u1fbpfcp-watermark.image)

对比这两张图我们可以发现，优化前总的 `script` 执行时间要比优化后的还要少一些，但是从实际的观感上看，优化前点击提交按钮，页面会卡死 1.2 秒左右，在优化后，页面不会完全卡死，但仍然会有渲染卡顿的感觉。

那么为什么在优化前页面会卡死呢？因为一次性提交的数据过多，内部 JS 执行时间过长，阻塞了 UI 线程，导致页面卡死。

优化后，页面仍有卡顿，是因为我们拆分数据的粒度是 1000 条，这种情况下，重新渲染组件仍然有压力，我们观察 fps 只有十几，会有卡顿感。通常只要让页面的 fps 达到 60，页面就会非常流畅，如果我们把数据拆分粒度变成 100 条，基本上 fps 能达到 50 以上，虽然页面渲染变流畅了，但是完成 10000 条数据总的提交时间还是变长了。

使用 `Time slicing `技术可以避免页面卡死，通常我们在这种耗时任务处理的时候会加一个 loading 效果，在这个示例中，我们可以开启 `loading animation`，然后提交数据。对比发现，优化前由于一次性提交数据过多，JS 一直长时间运行，阻塞 UI 线程，这个 loading 动画是不会展示的，而优化后，由于我们拆成多个时间片去提交数据，单次 JS 运行时间变短了，这样 loading 动画就有机会展示了。

> 这里要注意的一点，虽然我们拆时间片使用了 `requestAnimationFrame` API，但是使用 `requestAnimationFrame` 本身是不能保证满帧运行的，`requestAnimationFrame` 保证的是在浏览器每一次重绘后会执行对应传入的回调函数，想要保证满帧，只能让 JS 在一个 Tick 内的运行时间不超过 17ms。

```js
export function splitArray (list, chunkLength) {
  const chunks = []
  let chunk = []
  let i = 0
  let l = 0
  let n = list.length
  while (i < n) {
    chunk.push(list[i])
    l++
    if (l === chunkLength) {
      chunks.push(chunk)
      chunk = []
      l = 0
    }
    i++
  }
  chunk.length && chunks.push(chunk)
  return chunks
}

export class JobQueue {
  constructor ({ autoStart = false } = {}) {
    this.autoStart = autoStart

    this._queue = []
    this._running = false
    this._results = []
    this._resolves = []
    this._rejects = []
    this._runId = 0
  }

  get length () {
    return this._queue.length
  }

  addJob (func) {
    this._queue.push(async () => {
      try {
        const runId = this._runId
        const result = func(() => {
          // Run not cancelled
          if (runId === this._runId) {
            this._results.push(result)
            this._next()
          }
        })
      } catch (error) {
        this._reject(error)
      }
    })

    if (this.autoStart && this.length === 1) {
      this.start()
    }
  }

  clear () {
    this._running = false
    this._queue.length = 0
    this._resolves.length = 0
    this._rejects.length = 0
    this._results.length = 0
    this._runId++
  }

  cancel () {
    this._resolve()
    this.clear()
  }

  start () {
    return new Promise((resolve, reject) => {
      if (!this._running && this.length > 0) {
        this._running = true
        this._queue[0]()
        this._resolves.push(resolve)
        this._rejects.push(reject)
      } else {
        resolve()
      }
    })
  }

  _next () {
    if (this._running && this.length > 0) {
      this._queue.shift()

      if (this.length === 0) {
        this._resolve()
      } else {
        this._queue[0]()
      }
    }
  }

  _resolve () {
    this._resolves.forEach(f => f(this._results))
    this.clear()
  }

  _reject (error) {
    this._rejects.forEach(f => f(error))
    this.clear()
  }
}

```

链接：https://juejin.cn/post/6922641008106668045
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。