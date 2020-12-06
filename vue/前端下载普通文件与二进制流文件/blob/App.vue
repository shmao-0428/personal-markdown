<template>
  <div id="app">
    <input type="button" value="点击下载" @click="handleDownload" />
  </div>
</template>
<script>
import axios from 'axios';
export default {
  methods: {
    handleDownload() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/download',
        data: {
          test: 'test data',
        },
        // responseType: 'blob',
        // or
        responseType: 'arraybuffer', // arraybuffer是js中提供处理二进制的接口
      }).then((response) => {
        // 用返回二进制数据创建一个Blob实例
        let blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }); // for .xlsx files

        // 通过URL.createObjectURL生成文件路径
        let url = window.URL.createObjectURL(blob);

        // 创建a标签
        let ele = document.createElement('a');
        ele.style.display = 'none';

        // 设置href属性为文件路径，download属性可以设置文件名称
        ele.href = url;
        ele.download = '测试文件';

        // 将a标签添加到页面并模拟点击
        document.querySelectorAll('body')[0].appendChild(ele);
        ele.click();

        // 移除a标签
        ele.remove();
      });
    },
  },
};
</script>
