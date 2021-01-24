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
  </div>
</template>

<script>
import Worker from "./web17.worker.js";
import { encrypt, decrypt } from './encrypto';
export default {
  name: "WebWorker",
  data () {
    return {
      worker: null,
      value: [],
      originValue: []
    };
  },
  created () {
    // 创建 worker 实例
    // console.log('created>>', this.value);
    this.worker = new Worker();
    import("./data").then(r => {
      this.worker.postMessage(r);

      console.time();
      let encryptData = r.data.map((i) => {
        Object.keys(i).forEach((k) => {
          let value = encrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
          i[k] = value;
        });
        return i;
      });

      // console.log('encryptData>>>', encryptData[0]);

      let decryptData = encryptData.map((i) => {
        Object.keys(i).forEach((k) => {
          let value = decrypt(typeof i[k] === 'number' ? i[k] + '' : i[k]);
          i[k] = value;
        });
        return i;
      });

      this.originValue = decryptData;
      console.timeEnd();
    });

    let that = this;
    this.worker.onmessage = function (event) {
      //主线程接收到工作线程的消息
      // console.log("event>>>", event.data);
      that.value = event.data;
      //关闭线程
      this.terminate();
    };
  },
  mounted () {
    // this.$nextTick(() => {
    //   console.log('nexttick>>', this.value);
    // })
    // setTimeout(() => {
    //   console.log('setTimeout>>', this.value);
    //   console.log(this.worker);
    // }, 1000);
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