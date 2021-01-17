import Vue from 'vue';
import Toast from './toast.vue';
// console.log(Toast);
const ToastConstructor = Vue.extend(Toast);
// console.log(ToastConstructor);
function showToast(text, duration = 1000) {
  if (document.querySelector('#toast')) return;
  let ToastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        show: true,
      };
    },
  });
  console.log(ToastDom);
  document.body.appendChild(ToastDom.$el);
  let timeId = null;
  timeId = setTimeout(() => {
    ToastDom.show = false;
    timeId && (timeId = null) && clearTimeout(timeId);
  }, duration);
}

function registerToast() {
  Vue.prototype.$toast = showToast;
}

export default registerToast;
