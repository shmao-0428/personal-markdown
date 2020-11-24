/*
 * @Author: shmao
 * @Date: 2020-11-24 15:33:48
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-24 21:50:56
 */
import { h } from './h';
h(
  'div',
  { style: { color: 'red' }, id: 'warpper' },
  '这是div',
  h('span', {}, '这是审判'),
  '这是空白'
);

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
