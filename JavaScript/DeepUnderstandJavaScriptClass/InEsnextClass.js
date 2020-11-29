/**
 *  esnext 中的Class类语法
 */
class Animal {
  constructor(type) {
    this.type = '哺乳类';
    this._age = 100;
  }
  //   a = 1; // es7 实例上的属性
  get a() {
    // 原型上的
    return this._age;
  }
  set a(val) {
    this._age = val;
  }
  //   static flag = 1; // 静态属性
  static get flag() {
    // 静态属性
    return 2;
  }
  static getFlag() {} //静态方法
  eat() {
    console.log('eat');
  }
}
// Animal(); // error
// let animal = new Animal();
// animal.eat();
// animal.a = 200;
// console.log(animal.a);
// console.log(Animal.flag);
// console.log(animal.hasOwnProperty('a'));

// 1. Tiger.__proto__ = Animal
// 2. Animal.call(this)
// 3. Tiger.prototype = Object.create(Animal.prototype)
class Tiger extends Animal {
  constructor() {
    super(); // 在使用this,之前必须调用super  // Animal.call(this)
  }
  static getFlag() {
    return super.flag; //静态方法中的super指向父类
  }
  eat() {
    // 类的重写
    super.eat(); // 父类的原型
    // console.log('tiger eat');
  }
}
let tiger = new Tiger();
console.log(Tiger.flag);
console.log(tiger.type);
tiger.eat();
console.log(Tiger.getFlag());
// function Animal() {
//   if (!(this instanceof Animal)) {
//     throw new Error('not new');
//   }
// }

// Animal();
