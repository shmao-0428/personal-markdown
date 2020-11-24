/*
 * @Author: shmao
 * @Date: 2020-11-24 21:54:43
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-24 22:33:19
 */

let _vnode = h(
  'div',
  { style: { color: 'red' }, id: 'warpper', key: 'xxx' },
  'div...',
  h('span', { style: { color: 'blue' } }, '这是审判'),
  '这是空白'
);
// console.log(_vnode);
// 将虚拟节点 转化成 真实的dom节点.
const app = document.querySelector('#app');
render(_vnode, app);
function render(_vnode, app) {
  //   console.log(_vnode, app);
  let ele = createDomElementFrom(_vnode);

  app.appendChild(ele);
}

function createDomElementFrom(_vnode) {
  let { type, key, props, children, text } = _vnode;
  if (type) {
    // 建立虚拟节点和真实元素一个关系,后面可以用来更新真实dom
    _vnode.domElement = document.createElement(type);

    // 根据当前虚拟节点的属性, 去更新真实的dom
    updateProperties(_vnode);

    // children 里面也是虚拟dom
    children.forEach((childVode) => {
      // 递归渲染子节点
      render(childVode, _vnode.domElement);
    });
  } else {
    _vnode.domElement = document.createTextNode(text);
  }

  return _vnode.domElement;
}

function updateProperties(newVnode, oldProps = {}) {
  let domElement = newVnode.domElement; // 真实的dom元素
  let newProps = newVnode.props; // 当前虚拟节点的属性

  for (const oldPropName in oldProps) {
    if (!newProps[oldPropName]) {
      delete domElement[oldPropName];
    }
  }

  let newStyle = newProps.style || {};
  let oldStyle = oldProps.style || {};

  for (const propName in oldStyle) {
    if (!newStyle[propName]) {
      domElement.style[propName] = '';
    }
  }

  for (const newPropName in newProps) {
    if (newPropName === 'style') {
      let style = newProps.style;
      for (const key in style) {
        domElement.style[key] = style[key];
      }
    } else {
      domElement[newPropName] = newProps[newPropName];
    }
  }
}

/**
 *
 * @param {*} type 类型
 * @param {*} props 节点属性
 * @param  {...any} children 所有孩子
 */
function h(type, props = {}, ...children) {
  let key;
  if (props.key) {
    key = props.key;
    delete props.key;
  }

  children = children.map((child) => {
    if (typeof child === 'string') {
      return vnode(undefined, undefined, undefined, undefined, child);
    } else {
      return child;
    }
  });

  return vnode(type, key, props, children);
}

function vnode(type, key, props, children, text) {
  return {
    type,
    key,
    props,
    children,
    text,
  };
}
