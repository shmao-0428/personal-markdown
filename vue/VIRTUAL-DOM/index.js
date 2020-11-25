/*
 * @Author: shmao
 * @Date: 2020-11-24 15:33:48
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-25 10:58:37
 */

import { h } from './vdom/h.js';
import { render } from './vdom/render.js';

let vnode = h(
  'div',
  { style: { color: 'red' }, id: 'wrapper', key: 'this is key' },
  '我是红色',
  h('span', { style: { color: 'blue' } }, '我是蓝色'),
  '我是红色',
  h('div', { style: {color:'skyblue', fontSize: '20px'} }, '我是天蓝色'),
  h('div', {}, h('span', {} , '我是空白文本'))
);

// console.log(vnode);
const app = document.querySelector('#app');

render(vnode, app)

// 1. 先实现虚拟dom 主要就是一个对象 来描述dom节点
// createElement h

// h(
//   'div',
//   { id: 'wrapper', a: 1 },
//   h('span', { style: { color: 'red' } }, 'hello'),
//   'empty'
// );

/**
 *  <div id="wrapper" a=1>
 *   <span style="color:red">hello</span>
 *  empty
 * </div>
 */

// {
//   type: 'div',
//   props: {
//     id: 'wrapper',
//     a: 1,
//   },
//   children: [
//     { type: 'span', props: { color: 'red' }, children: [] },
//     { type: 'span', props: { color: 'red' }, children: [], text: 'empty' },
//   ],
// };
