function inheritPrototype(Son, Father) {
  let prototype = Object.create(Father.prototype);
  prototype.constructor = Son;
  Son.prototype = prototype;
  // Son.__proto__ = Father;
  // Object.setPrototypeOf(Son, Father);
}

function Father(name) {
  this.name = name;
}

Father.getCode = function() {
  console.log('this is father code');
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

// console.log(father);
// console.log(son);
// son.getAge();
// son.getName();
// console.log(Father.prototype.constructor);
// console.log(Son.prototype.constructor);


// js 继承为什么要把子类的__proto__指向父类
// console.dir(Son.__proto__ === Function.prototype); // true
// console.log(Son.__proto__.__proto__ === Object.prototype); // true

// console.dir(Son.__proto__ === Father); // true
// console.log(Son.__proto__.__proto__ === Function.prototype); // true
// console.log(Son.__proto__.__proto__.__proto__ === Object.prototype); // true

// 为了继承父类的静态方法
Son.getCode()