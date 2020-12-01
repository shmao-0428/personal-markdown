import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
// 引入字体的文件
import './assets/font/iconfont.css';
// 引入全局的样式文件
import './assets/css/global.less';

import SocketService from './service/socket-service';
// 对服务的进行连接
SocketService.Instance.connect();

Vue.config.productionTip = false;

// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/';

Vue.prototype.$http = axios;
Vue.prototype.$echarts = window.echarts;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
