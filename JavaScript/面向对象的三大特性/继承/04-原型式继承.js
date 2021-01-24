function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
let person = {
  name: 'father',
  arr: [1, 2, 3],
};
let a = object(person); // Object.create()
a.name = 'a';
a.arr.push(4);

console.log(person); // { name: 'father', arr: [ 1, 2, 3, 4 ] }

/** 在没有必要兴师动众的创建构造函数,而只想让一个对象与另一个对象保持类似的情况下, 该模式可以完全胜任
 * 但是同时他和原型链继承一样,引用类型 会被修改
 */
