import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router/hash';
// import router from './router/history';
import store from './store';

import VueWorker from 'vue-worker';
Vue.use(VueWorker);

// 引入toast组件
import toastRegister from '@/components/Toast/toast.js';
Vue.use(toastRegister);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

import { registerMicroApps, start } from 'qiankun';
const apps = [
  {
    name: 'vueApp', // F:\My Front-end Blogs\potato\vue\007BMS-v1.0
    entry: '//localhost:9001',
    container: '#vue',
    // https://qiankun.umijs.org/zh/cookbook#activerule-%E4%BD%BF%E7%94%A8-locationpathname-%E5%8C%BA%E5%88%86%E5%BE%AE%E5%BA%94%E7%94%A8
    activeRule: '/appvue', // 子应用路由history模式 设置base: 'appvue'
  },
  {
    name: 'vueTemplate', // F:\GITHUB\vue-element-admin
    entry: '//localhost:9527',
    container: '#vueTemplate',
    activeRule: '/temvue',
  },
];
registerMicroApps(apps);
start();
