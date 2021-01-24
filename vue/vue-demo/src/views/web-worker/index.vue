<template>
  <div class="web-worker">
    <div class="worker">
      <h3>web worker</h3>
      <div v-for="(item,index) in value" :key="index">
        <span class="margin-20">gender: {{ item.gender }}</span>
        <span class="margin-20">height: {{ item.height }}</span>
        <span class="margin-20">weight: {{ item.weight }}</span>
    </div>
    </div>
    <div class="worker">
      <h3>no web worker</h3>
      <div v-for="(item,index) in originValue" :key="index">
        <span class="margin-20">gender: {{ item.gender }}</span>
        <span class="margin-20">height: {{ item.height }}</span>
        <span class="margin-20">weight: {{ item.weight }}</span>
    </div>
    </div>
    <div class="worker">
      <h3>no web worker in setTimeout</h3>
      <div v-for="(item,index) in macroValue" :key="index">
        <span class="margin-20">gender: {{ item.gender }}</span>
        <span class="margin-20">height: {{ item.height }}</span>
        <span class="margin-20">weight: {{ item.weight }}</span>
    </div>
    </div>
  </div>
</template>

<script>
import Worker from "./web23.worker.js";
import { encrypt, decrypt } from './encrypto';
import { data } from './data'
export default {
  name: "WebWorker",
  data () {
    return {
      worker: null,
      value: [],
      originValue: [],
      macroValue: []
    };
  },
  created () {
    // 创建 worker 实2
    this.worker = new Worker();
    this.worker.postMessage(data);

    let that = this;
    this.worker.onmessage = function (event) {
      //主线程接收到工作线程的消息
      // console.log("event>>>", event.data);
      that.value = event.data;
      //关闭线程
      this.terminate();
    };

    console.time('no worker');
    let encryptData = data.map((i) => {
      Object.keys(i).forEach((k) => {
        let value = encrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
        i[k] = value;
      });
      return i;
    });

    console.log('%c no worker>>>:', 'color:red;font-weight:700;', encryptData[0]);

    let decryptData = encryptData.map((i) => {
      Object.keys(i).forEach((k) => {
        let value = decrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
        i[k] = value;
      });
      return i;
    });

    this.originValue = decryptData;
    console.timeEnd('no worker');
  },
  mounted () {
    setTimeout(() => {
      console.time('settimeout');
      let encryptData = data.map((i) => {
        Object.keys(i).forEach((k) => {
          let value = encrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
          i[k] = value;
        });
        return i;
      });

      console.log('%c settimeout >>>', 'color:blue;font-weight:700;', encryptData[0]);

      let decryptData = encryptData.map((i) => {
        Object.keys(i).forEach((k) => {
          let value = decrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
          i[k] = value;
        });
        return i;
      });

      this.macroValue = decryptData;
      console.timeEnd('settimeout');
    }, 300);
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
.web-worker {
  display: flex;
  .worker {
    flex: 1;
  }
}
</style>