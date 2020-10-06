/*
 * @Author: shmao
 * @Date: 2020-10-06 16:28:31
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 18:17:04
 */

//  要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建
//  过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。代码如下：
class Singleton {
  constructor(name) {
    this.name = name;
    this.instance = null;
  }
  getName() {
    return alert(this.name);
  }
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name);
    }
    return this.instance;
  }
}

const a = Singleton.getInstance('a');
const b = Singleton.getInstance('b');
console.log(a === b); // true

// 我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单，但有
// 一个问题，就是增加了这个类的“不透明性”，Singleton 类的使用者必须知道这是一个单例类，
// 跟以往通过 new XXX 的方式来获取对象不同，这里偏要使用 Singleton.getInstance 来获取对象。
// 接下来顺便进行一些小测试，来证明这个单例类是可以信赖的：
// var a = Singleton.getInstance( 'sven1' );
// var b = Singleton.getInstance( 'sven2' );
// alert ( a === b ); // true
// 虽然现在已经完成了一个单例模式的编写，但这段单例模式代码的意义并不大。从下一节开
// 始，我们将一步步编写出更好的单例模式。
