# 在vue中使用web worker

# 需求

假设对一段大数量的数据进行加密解密, 这时我们可以将数据处理放到web worker中进行计算

# 使用

**encrypto.js**

```js
import sm from 'sm-crypto';
const sm4 = sm.sm4;
const key = '0123456789abcdeffedcba9876543210'; // 可以为 16 进制串或字节数组，要求为 128 比特

export const encrypt = (value) => {
  return sm4.encrypt(value, key);
};
export const decrypt = (value) => {
  return sm4.decrypt(value, key);
};
```

**web.worker.js**

```js
import { encrypt, decrypt } from './encrypto';
onmessage = function(evt) {
  //工作线程接收到主线程的消息
  //向主线程发送消息
  console.time('worker');
  let data = evt.data.data.map((i) => {
    Object.keys(i).forEach((k) => {
      let value = encrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
      i[k] = value;
    });
    return i;
  });

  let decryptData = data.map((i) => {
    Object.keys(i).forEach((k) => {
      let value = decrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
      i[k] = value;
    });
    return i;
  });
  postMessage(decryptData);
  console.timeEnd('worker');
  self.close();
};

//错误信息
onerror = function(event) {
  console.log('error', event.message);
};

```

**index.vue**

```vue
<template>
  <div class="web-worker">
    <div v-for="(item,index) in value" :key="index">
      <span class="margin-20">gender: {{ item.gender }}</span>
      <span class="margin-20">height: {{ item.height }}</span>
      <span class="margin-20">weight: {{ item.weight }}</span>
    </div>
  </div>
</template>

<script>
# 开发时每次都要修改文件名称
import Worker from "./web15.worker.js";

export default {
  name: "WebWorker",
  data () {
    return {
      worker: null,
      value: []
    };
  },
  created () {
    // 创建 worker 实例
    console.log('created>>', this.value);
    this.worker = new Worker();
    import("./data").then(r => {
      this.worker.postMessage(r);
    });

    let that = this;
    this.worker.onmessage = function (event) {
      //主线程接收到工作线程的消息
      console.log("event>>>", event.data);
      that.value = event.data;
      //关闭线程
      this.terminate();
    };
  },
  mounted () {
    this.$nextTick(() => {
      console.log('nexttick>>', this.value);
    })
    setTimeout(() => {
      console.log('setTimeout>>', this.value);
    }, 800);
  },
  beforeDestroy () {
    this.worker.terminate();
    this.worker = null;
  }
};
</script>
<style lang="less">
.margin-20 {
  margin-right: 20px;
}
</style>
```

# 注意点

在vue项目中，如果直接使用，首先遇到的问题是**worker文件路径与打包解析问题**，这种首先需要安装worker-loader,解析web worker，执行以下命令即可：

```cmd
npm install worker-loader -D
```

vue.config.js要添加以下配置：

```js
module.exports = {
  // https://github.com/webpack-contrib/worker-loader
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.worker.js$/,
      use: {
        loader: 'worker-loader',
        options: { inline: 'fallback', filename: `workerName.[hash].js` },
      },
    });
  },
  parallel: false,
  chainWebpack: (config) => {
    config.output.globalObject('this');
  },
};
```

或者

```js
//对内部的 webpack 配置进行更细粒度的修改  
chainWebpack: config => {    
    config.module
        .rule('worker')
        .test(/\.worker\.js$/)
        .use('worker-loader')
        .loader('worker-loader')
        .options({        
        inline: 'fallback'
    })    
    // 解决 "window is undefined", 这是因为 worker 线程中不存在 window 对象, 要用 this 代替    
    config.output.globalObject('this')  
},    
// 解决打包的时报错    
parallel: false,

```



还存在另外一个问题，就是每次修改worker文件时，**比如debugger调试或者只是修改文件内容事浏览器总是保留之前的记录，感觉是在编译时的缓存或者浏览器的缓存**，**目前解决办法是修改worker.js文件名称**，比较繁琐.

# 使用场景

主要是处理耗时的任务，不阻塞用户界面。

- 复杂数据的运算、排序等处理
- 图像、视频、音频的处理，如把彩色图像转换成灰阶图像等
- canvas图形处理
- 加密解密等
- 大数据处理
- ...

# 参考链接

1. [vue中使用web worker](https://www.cnblogs.com/gerry2019/p/11456035.html)

2. [在Vue中使用Web Worker](https://blog.csdn.net/wsln_123456/article/details/102725252)
3. [vue中使用web worker踩坑](https://juejin.cn/post/6859365777590452237)
4. [阮一峰Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
5. [Web Worker](https://juejin.cn/post/6896104084899069966)