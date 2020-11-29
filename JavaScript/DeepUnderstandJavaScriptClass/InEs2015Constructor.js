/**
 *  es2015 中的构造函数
 */

function Animal() {
  if (new.target === Animal) {
    throw new Error('animal类不能被new 可以被继承');
  }
  this.type = '哺乳类';
}
Animal.prototype.eat = function () {
  console.log('eat');
};
// let animal = new Animal();
// console.log(animal.eat());
// console.log(animal.hasOwnProperty('eat'));
// console.log(animal.__proto__.hasOwnProperty('eat'));
// console.log(animal.__proto__ === Animal.prototype);
// console.log(animal.constructor === animal.__proto__.constructor);
// console.log(Animal.prototype.__proto__ === Object.prototype);
// console.log(Object.prototype.__proto__);

function Tiger() {
  Animal.call(this);
}
// Tiger.prototype.__proto__ = Animal.prototype;
// or
// Object.setPrototypeOf(Tiger.prototype, Animal.prototype);
// or
// Tiger.prototype = Object.create(Animal.prototype, {
//   constructor: { value: Tiger },
// });
// or
Tiger.prototype = create(Animal.prototype);
let tiger = new Tiger();

// console.log(tiger.type);
// console.log(Tiger.prototype === Animal.prototype); // false
tiger.eat();

console.log(tiger.constructor === Tiger);

function create(parentPrototype) {
  const Fn = function () {};
  Fn.prototype = parentPrototype;
  let fn = new Fn();
  fn.constructor = Tiger;
  return fn;
}
