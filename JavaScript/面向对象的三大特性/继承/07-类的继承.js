class Father {
  // 静态方法
  #age = 60;
  constructor(state = false) {
    // console.log(new.target === Father);
    this.name = 'father';
    this.state = state;
  }
  get age() {
    console.log(this.#age);
  }
  static money = 100;
  static getMon() {
    console.log('父类的getMon,继承父类的静态方法');
  }
  sayHi() {
    console.log('hi', this.name);
  }
  // 这种写法this永远指向father
  getName = () => {
    console.log(this.name);
  };

  m = () => {
    console.log('m');
  };
}

class Son extends Father {
  // 静态方法
  #age = 16;
  constructor(state) {
    // console.log(new.target === Son);
    super(state);
    this.name = 'son';
    // console.log(super.name); // undefined
    // super.sayHi(); // super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
  }
  get age() {
    console.log(this.#age);
  }
  static girlFrinend = 'xm';
  static getState() {
    console.log(super.state);
    console.log(this); //this 指向Son
    console.log(Son.girlFrinend);
  }
  getName = () => {
    console.log(this.name);
  };
  getAge() {
    // super 指向son
    console.log(super.age);
    console.log(this.age);
  }
  sayHi() {
    super.sayHi();
    // super.m(); // error
  }

  static xixi() {
    // 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
    console.log(super.money);
  }
}

let father = new Father();
let son = new Son(true);
// console.log(father);
// console.log(son);

// son.getName.call(father); // son
// son.getAge.call(father); // 60
// son.age;

// son.getAge();
// Son.getState(); // 静态方法可以被继承

// console.log(Son.money); // 100
// son.sayHi();
// father.sayHi();
// Son.xixi();

class Sun extends Father {
  constructor() {
    super();
  }
  static getMon() {
    console.log('子类的getMon');
  }
}
console.log(Sun.getMon());
