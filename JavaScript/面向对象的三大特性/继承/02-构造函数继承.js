function Father() {
  this.name = 'father';
  this.age = 60;
  this.happy = [1, 2, 3];
}

Father.prototype.arr = [1, 2, 3];

function Son() {
  Father.call(this);
  this.name = 'son';
}

let son = new Son();
son.happy = [1];
console.log(son.happy);
let father = new Father();
father.happy = [2];
console.log(father.happy);
let c = new Son();
console.log(c.happy);

/** 弊端
 * 1.父类构造函数臃肿
 */
