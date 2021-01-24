/** 多态是指一个引用(类型)在不同情况下的多种状态
 * 多态是指通过指向父类的引用, 来调用在不同子类中实现的方法
 */
class Master {
  constructor(name) {
    this.name = name;
  }
  feed(animal, food) {
    console.log(`给${animal.name}喂${food.name}`);
  }
}

// 食物
class Food {
  constructor(name) {
    this.name = name;
  }
}

class Fish extends Food {
  constructor(name) {
    super(name);
  }
}
class Bone extends Food {
  constructor(name) {
    super(name);
  }
}
class Peach extends Food {
  constructor(name) {
    super(name);
  }
}

// 动物类
class Animal {
  constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
  }
}
class Monkey extends Animal {
  constructor(name) {
    super(name);
  }
}

let cat = new Cat('猫');
let fish = new Fish('猫');
let dog = new Dog('狗');
let bone = new Bone('骨头');
let monkey = new Monkey('猴');
let peach = new Peach('桃');

let master = new Master('张三');
master.feed(cat, fish);
master.feed(dog, bone);
master.feed(monkey, peach);
