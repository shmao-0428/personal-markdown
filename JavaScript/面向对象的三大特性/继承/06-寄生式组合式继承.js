function inheritPrototype(son, father) {
  let prototype = Object.create(father.prototype);
  prototype.constructor = son;
  son.prototype = prototype;
}

function Father(name) {
  this.name = name;
}

Father.prototype.getName = function () {
  console.log(this.name);
};

function Son(name) {
  Father.call(this, name);
  this.age = 12;
}
inheritPrototype(Son, Father);
Son.prototype.getAge = function () {
  console.log(this.age);
};

let father = new Father('father');

let son = new Son('son');

console.log(father);
console.log(son);
son.getAge();
son.getName();
console.log(Father.prototype.constructor);
console.log(Son.prototype.constructor);
