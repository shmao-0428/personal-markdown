/*
 * @Author: shmao
 * @Date: 2020-11-24 15:44:05
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-25 10:40:19
 */

import { vnode } from "./vnode.js";

export function h(type, props = {}, ...children) {
  // 判断是否有key
  let key;
  if (props.key) {
    key = props.key;
    delete props.key;
  }

  // 遍历children 如果是字符串 就重新创建结构
  children = children.map((child) => {
    if (typeof child === "string") {
      return vnode(undefined, undefined, undefined, undefined, child);
    } else {
      return child;
    }
  });

  return vnode(type, key, props, children);
}
