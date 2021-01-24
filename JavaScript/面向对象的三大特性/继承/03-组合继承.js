function Father(age) {
  this.age = age;
  this.arr = [1, 2, 3];
}
Father.prototype.getSex = function () {
  console.log(this.age);
};

// Father.prototype.arr = [1, 2, 3];

function Son() {
  Father.call(this, 50);
  this.name = 'son';
}

Son.prototype = new Father();
Son.prototype.constructor = Son;
let son = new Son();
console.log(son.getSex());
console.log(son.age);

son.arr.push(4);

let father = new Father();
console.log(father.arr); // [1,2,3]

console.log(Father.prototype.constructor);
console.log(Son.prototype.constructor);
