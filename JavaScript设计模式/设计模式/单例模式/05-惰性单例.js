/*
 * @Author: shmao
 * @Date: 2020-10-06 16:29:33
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 19:22:50
 */
// 基于类的单例模式

// 前文的
Singleton.getInstance = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
// 基于“类”的单例模式在 JavaScript 中并不适用

// 假设我们是 WebQQ 的开发人员（网址是web.qq.com），当点击左边导航里 QQ 头像时，会弹
// 出一个登录浮窗（如图 4-1 所示），很明显这个浮窗在页面里总是唯一的，不可能出现同时存在
// 两个登录窗口的情况。

// 通过案例1和案例2
// 虽然现在达到了惰性的目的，但失去了单例的效果。当我们每次点击登录按钮的时候，都会
// 创建一个新的登录浮窗 div。虽然我们可以在点击浮窗上的关闭按钮时（此处未实现）把这个浮
// 窗从页面中删除掉，但这样频繁地创建和删除节点明显是不合理的，也是不必要的。
// 也许读者已经想到了，我们可以用一个变量来判断是否已经创建过登录浮窗，这也是本节第
// 一段代码中的做法：
var createLoginLayer = (function () {
  var div;
  return function () {
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = '我是登录浮窗';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  };
})();

document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createLoginLayer();
  loginLayer.style.display = 'block';
};
