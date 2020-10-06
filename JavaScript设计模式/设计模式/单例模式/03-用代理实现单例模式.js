/*
 * @Author: shmao
 * @Date: 2020-10-06 16:29:07
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 18:57:37
 */
class CreateDiv {
  constructor(html) {
    this.html = html;
    this.init();
  }
  init() {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }
}

const ProxySingletonCreateDiv = (function () {
  let instance = null;
  return function (html) {
    if (instance) {
      return instance;
    }
    return (instance = new CreateDiv(html));
  };
})();

console.log(ProxySingletonCreateDiv);

var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
alert(a === b);

// 通过引入代理类的方式，我们同样完成了一个单例模式的编写，跟之前不同的是，现在我们
// 把负责管理单例的逻辑移到了代理类 proxySingletonCreateDiv 中。这样一来，CreateDiv 就变成了
// 一个普通的类，它跟 proxySingletonCreateDiv 组合起来可以达到单例模式的效果。
