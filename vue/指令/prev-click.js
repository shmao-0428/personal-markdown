
import Vue from 'vue';
Vue.directive('prev-repeat-click', {
  // 每当指令绑定到元素上的时候，会立即执行这个bind函数，只执行一次
  bind: function (el, binding) {

    let timer;
    async function clickHandler (e) {
      if (timer) clearTimeout(timer);
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target) && el.getAttribute('disabled') !== 'disabled') {
        el.classList.add('is-disabled');
        el.setAttribute('disabled', 'disabled');
        // 判断指令中是否绑定了函数, 如果绑定了函数 则调用那个函数
        try {
          if (binding.expression) {
            await binding.value(e);
          }
        } finally {
          timer = setTimeout(() => {
            el.removeAttribute('disabled');
            el.classList.remove('is-disabled');
          }, 300);
        }
      }

    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = clickHandler;
    document.addEventListener('click', clickHandler);
  },
  unbind(el) {   // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
})
