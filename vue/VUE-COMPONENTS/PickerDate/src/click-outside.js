/*
 * @Author: shmao
 * @Date: 2020-11-28 15:18:54
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-28 15:29:51
 */
export const clickOutside = {
  bind(el, binding, vnode) {
    el.handler = handler;
    const handler = (e) => {
      if (el.contains(e.target)) {
        vnode.context.focus();
      } else {
        vnode.context.blur();
      }
    };
    document.addEventListener('click', handler);
  },
  unbind(el) {
    document.removeEventListener('click', el.handler);
  },
};
