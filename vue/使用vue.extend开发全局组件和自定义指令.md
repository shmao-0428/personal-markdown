## 开发全局组件，你可能需要了解一下Vue.extend

`Vue.extend`是一个全局Api,平时我们在开发业务的时候很少会用到它，但有时候我们希望可以开发一些全局组件比如`Loading`,`Notify`,`Message`等组件时，这时候就可以使用`Vue.extend`。

同学们在使用`element-ui`的`loading`时，在代码中可能会这样写

```javascript
// 显示loading
const loading = this.$loading()
// 关闭loading
loading.close()
```

这样写可能没什么特别的，但是如果你这样写

```javascript
const loading = this.$loading()
const loading1 = this.$loading()
setTimeout(() => {
  loading.close()
}, 1000 * 3)
```

这时候你会发现，我调用了两次loading,但是只出现了一个，而且我只关闭了`loading`，但是`loading1`也被关闭了。这是怎么实现的呢？我们现在就是用`Vue.extend` + 单例模式去实现一个`loading`

#### 开发`loading`组件

```javascript
<template>
  <transition name="custom-loading-fade">
    <!--loading蒙版-->
    <div v-show="visible" class="custom-loading-mask">
      <!--loading中间的图标-->
      <div class="custom-loading-spinner">
        <i class="custom-spinner-icon"></i>
        <!--loading上面显示的文字-->
        <p class="custom-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
  // 是否显示loading
    visible: {
      type: Boolean,
      default: false
    },
    // loading上面的显示文字
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
```

开发出来`loading`组件之后，如果需要直接使用，就要这样去用

```javascript
<template>
  <div class="component-code">
    <!--其他一堆代码-->
    <custom-loading :visible="visible" text="加载中" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
```

但这样使用并不能满足我们的需求

1. 可以通过js直接调用方法来显示关闭
2. `loading`可以将整个页面全部遮罩起来

#### 通过`Vue.extend`将组件转换为全局组件

##### 1. 改造`loading`组件，将组件的`props`改为`data`

```javascript
export default {
  data() {
    return {
      text: '',
      visible: false
    }
  }
}
```

##### 2. 通过`Vue.extend`改造组件

```javascript
// loading/index.js
import Vue from 'vue'
import LoadingComponent from './loading.vue'

// 通过Vue.extend将组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent)

let loading = undefined

LoadingConstructor.prototype.close = function() {
  // 如果loading 有引用，则去掉引用
  if (loading) {
    loading = undefined
  }
  // 先将组件隐藏
  this.visible = false
  // 延迟300毫秒，等待loading关闭动画执行完之后销毁组件
  setTimeout(() => {
    // 移除挂载的dom元素
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    // 调用组件的$destroy方法进行组件销毁
    this.$destroy()
  }, 300)
}

const Loading = (options = {}) => {
  // 如果组件已渲染，则返回即可
  if (loading) {
    return loading
  }
  // 要挂载的元素
  const parent = document.body
  // 组件属性
  const opts = {
    text: '',
    ...options
  }
  // 通过构造函数初始化组件 相当于 new Vue()
  const instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: opts
  })
  // 将loading元素挂在到parent上面
  parent.appendChild(instance.$el)
  // 显示loading
  Vue.nextTick(() => {
    instance.visible = true
  })
  // 将组件实例赋值给loading
  loading = instance
  return instance
}

export default Loading
```

##### 3. 在页面使用loading

```javascript
import Loading from './loading/index.js'
export default {
  created() {
    const loading = Loading({ text: '正在加载。。。' })
    // 三秒钟后关闭
    setTimeout(() => {
      loading.close()
    }, 3000)
  }
}
```

通过上面的改造，loading已经可以在全局使用了，如果需要像`element-ui`一样挂载到`Vue.prototype`上面，通过`this.$loading`调用，还需要改造一下

#### 将组件挂载到`Vue.prototype`上面

```javascript
Vue.prototype.$loading = Loading
// 在export之前将Loading方法进行绑定
export default Loading

// 在组件内使用
this.$loading()
```




 ## 自定义指令，从底层解决问题



什么是指令？指令就是你女朋友指着你说，“那边搓衣板，跪下，这是命令！”。开玩笑啦，程序员哪里会有女朋友。

通过上一节我们开发了一个`loading`组件，开发完之后，其他开发在使用的时候又提出来了两个需求

1. 可以将`loading`挂载到某一个元素上面，现在只能是全屏使用
2. 可以使用指令在指定的元素上面挂载`loading`

有需求，咱就做，没话说

#### 开发`v-loading`指令

```javascript
import Vue from 'vue'
import LoadingComponent from './loading'
// 使用 Vue.extend构造组件子类
const LoadingContructor = Vue.extend(LoadingComponent)

// 定义一个名为loading的指令
Vue.directive('loading', {
  /**
   * 只调用一次，在指令第一次绑定到元素时调用，可以在这里做一些初始化的设置
   * @param {*} el 指令要绑定的元素
   * @param {*} binding 指令传入的信息，包括 {name:'指令名称', value: '指令绑定的值',arg: '指令参数 v-bind:text 对应 text'}
   */
  bind(el, binding) {
    const instance = new LoadingContructor({
      el: document.createElement('div'),
      data: {}
    })
    el.appendChild(instance.$el)
    el.instance = instance
    Vue.nextTick(() => {
      el.instance.visible = binding.value
    })
  },
  /**
   * 所在组件的 VNode 更新时调用
   * @param {*} el
   * @param {*} binding
   */
  update(el, binding) {
    // 通过对比值的变化判断loading是否显示
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value
    }
  },
  /**
   * 只调用一次，在 指令与元素解绑时调用
   * @param {*} el
   */
  unbind(el) {
    const mask = el.instance.$el
    if (mask.parentNode) {
      mask.parentNode.removeChild(mask)
    }
    el.instance.$destroy()
    el.instance = undefined
  }
})
```

#### 在元素上面使用指令

```javascript
<template>
  <div v-loading="visible"></div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  created() {
    this.visible = true
    fetch().then(() => {
      this.visible = false
    })
  }
}
</script>
```

#### 项目中哪些场景可以自定义指令

1. 为组件添加`loading`效果
2. 按钮级别权限控制 `v-permission`
3. 代码埋点,根据操作类型定义指令
4. input输入框自动获取焦点
5. 其他等等。。。