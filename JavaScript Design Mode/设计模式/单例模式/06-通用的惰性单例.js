/*
 * @Author: shmao
 * @Date: 2020-10-06 16:29:48
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 19:25:46
 */

// 这段代码仍然是违反单一职责原则的，创建对象和管理单例的逻辑都放在 createLoginLayer对象内部。
// 如果我们下次需要创建页面中唯一的 iframe，或者 script 标签，用来跨域请求数据，就必须得如法炮制，把 createLoginLayer 函数几乎照抄一遍.
var createIframe = (function () {
  var iframe;
  return function () {
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
    return iframe;
  };
})();

// 我们需要把不变的部分隔离出来，先不考虑创建一个 div 和创建一个 iframe 有多少差异，管
// 理单例的逻辑其实是完全可以抽象出来的，这个逻辑始终是一样的：用一个变量来标志是否创建
// 过对象，如果是，则在下次直接返回这个已经创建好的对象：
var obj;
if (!obj) {
  obj = xxx;
}
// 现在我们就把如何管理单例的逻辑从原来的代码中抽离出来，这些逻辑被封装在 getSingle
// 函数内部，创建对象的方法 fn 被当成参数动态传入 getSingle 函数：
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};
// 接下来将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle，我们不仅可以传入
// createLoginLayer，还能传入 createScript、createIframe、createXhr 等。之后再让 getSingle 返回
// 一个新的函数，并且用一个变量 result 来保存 fn 的计算结果。
var createLoginLayer = function () {
  var div = document.createElement('div');
  div.innerHTML = '我是登录浮窗';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);
document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createSingleLoginLayer();
  loginLayer.style.display = 'block';
};
//    下面我们再试试创建唯一的 iframe 用于动态加载第三方页面：
var createSingleIframe = getSingle(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  return iframe;
});
document.getElementById('loginBtn').onclick = function () {
  var loginLayer = createSingleIframe();
  loginLayer.src = 'http://baidu.com';
};
//    在这个例子中，我们把创建实例对象的职责和管理单例的职责分别放置在两个方法里，这两
//    个方法可以独立变化而互不影响，当它们连接在一起的时候，就完成了创建唯一实例对象的功能，
//    看起来是一件挺奇妙的事情。
