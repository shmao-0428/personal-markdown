/*
 * @Author: shmao
 * @Date: 2020-11-25 09:51:58
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-25 11:00:44
 */

export function render(vnode, element) {
  // console.log('%c render:', 'color:red;font-weight:700;', vnode, element);

  // 将虚拟dom转化为真实dom
  const ele = createDomFromVdom(vnode);

  element.appendChild(ele);
}

function createDomFromVdom(vnode) {
  const { type, key, props, children, text } = vnode;
  //   console.log(type, children);
  // 如果是dom
  if (type) {
    
    vnode.domElement = document.createElement(type);

    // 根据虚拟节点 去更新真实的dom
    updateVnode2dom(vnode);

    children.forEach((child) => {
      // console.log(child);
      // 递归渲染子节点
      render(child, vnode.domElement);
    });
  } else {
    vnode.domElement = document.createTextNode(text);
  }

  return vnode.domElement;
}

function updateVnode2dom(newVnode, oldVnode = {}){

    // TODO 属性变更 或者更新
    
    const { domElement, props: newVnodeProps } = newVnode;
    // console.log('%c newVode:', 'color:red;font-weight:700;', newVnodeProps);
    
    for (const newProps in newVnodeProps) {
        if(newProps === 'style') {
            let styles = newVnodeProps.style;
            for (const key in styles) {
                domElement.style[key] = styles[key];
            }
        }else {
            domElement[newProps] = newVnodeProps[newProps];
        }
    }
}