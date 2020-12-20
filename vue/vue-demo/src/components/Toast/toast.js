import Vue from 'vue';
import Toast from './toast.vue';
// console.log(Toast);
const ToastConstructor = Vue.extend(Toast);
// console.log(ToastConstructor);
function showToast(text, duration = 3000) {
  if (document.querySelector('#toast')) return;
  const ToastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        show: true,
      };
    },
  });
  // console.log(ToastDom);
  document.body.appendChild(ToastDom.$el);
  setTimeout(() => {
    ToastDom.show = false;
  }, duration);
}

function registerToast() {
  Vue.prototype.$toast = showToast;
}

export default registerToast;
