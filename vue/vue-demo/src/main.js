import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import router from './router/hash';
// import router from './router/history';
import store from './store';

// 引入toast组件
import toastRegister from '@/components/Toast/toast.js';
Vue.use(toastRegister);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
