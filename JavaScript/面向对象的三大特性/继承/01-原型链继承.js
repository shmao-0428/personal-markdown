function Father() {
  this.age = 60;
  this.happy = [1, 2, 3];
}
Father.prototype.getSex = function () {
  console.log(this.age);
};
Father.prototype.arr = [1, 2, 3];

function Son() {
  this.name = 'son';
}

Son.prototype = new Father();
Son.prototype.constructor = Son;
let son = new Son();
console.log(son.getSex());

son.arr.push(4);

let father = new Father();
console.log(father.arr); // [1,2,3,4]

/** 弊端
 * 1. 原型上的引用类型 会被修改
 * 2. 子类不能像父类传递参数
 */
