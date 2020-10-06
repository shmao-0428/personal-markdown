/*
 * @Author: shmao
 * @Date: 2020-10-06 16:28:54
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 18:39:09
 */

// 案例一 :在页面中创建唯一的div节点
const CreateDiv = (function () {
  let instance = null;
  class CreateDiv {
    //  违反了单一职责
    constructor(html) {
      if (instance) {
        return instance;
      }
      this.html = html;
      this.init();
      return (instance = this);
    }
    init() {
      const div = document.createElement('div');
      div.innerHTML = this.html;
      document.body.appendChild(div);
    }
  }
  return CreateDiv;
})();

// 案例二
const Singleton = (function () {
  let instance = null;
  class Singleton {
    constructor(name) {
      if (instance) {
        return instance;
      }
      this.name = name;
      return (instance = this);
    }
  }
  return Singleton;
})();
const a = new Singleton('a');
const b = new Singleton('b');
console.log(a === b); // true

// 虽然现在完成了一个透明的单例类的编写，但它同样有一些缺点。
// 为了把 instance 封装起来，我们使用了自执行的匿名函数和闭包，并且让这个匿名函数返回
// 真正的 Singleton 构造方法，这增加了一些程序的复杂度，阅读起来也不是很舒服。
// 观察现在的 Singleton 构造函数：
// var CreateDiv = function( html ){
//  if ( instance ){
//  return instance;
//  }
//  this.html = html;
//  this.init();
//  return instance = this;
// };
// 在这段代码中，CreateDiv 的构造函数实际上负责了两件事情。第一是创建对象和执行初始
// 化 init 方法，第二是保证只有一个对象。虽然我们目前还没有接触过“单一职责原则”的概念，
// 但可以明确的是，这是一种不好的做法，至少这个构造函数看起来很奇怪。
// 假设我们某天需要利用这个类，在页面中创建千千万万的 div，即要让这个类从单例类变成
// 一个普通的可产生多个实例的类，那我们必须得改写 CreateDiv 构造函数，把控制创建唯一对象
// 的那一段去掉，这种修改会给我们带来不必要的烦恼。
