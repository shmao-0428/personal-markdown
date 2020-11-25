/*
 * @Author: shmao
 * @Date: 2020-11-25 10:19:23
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-25 10:20:05
 */
export function vnode(type, key, props, children, text) {
  return {
    type,
    key,
    props,
    children,
    text,
  };
}
