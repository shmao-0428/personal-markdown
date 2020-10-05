/*
 * @Author: shmao
 * @Date: 2020-10-05 22:38:30
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-05 22:49:49
 */

/**
 *  1.需求
 *  打车时，可以打专车或快车。任何车都有车牌号和名称
 *  不同车价格不同，快车每公里1元，专车每公里2元
 *  行程开始时，显示车辆信息
 *  行程结束时，显示打车余额（假定行程为5公里）
 */

/**
 * 车
 */
class Car {
  constructor(name, number) {
    this.name = name;
    this.number = number;
  }
}
/**
 *  快车
 */
class SpeedCar extends Car {
  constructor(name, number, price) {
    super(name, number);
    this.price = price;
  }
}
/**
 *  专车
 */
class SpecialCar extends Car {
  constructor(name, number, price) {
    super(name, number);
    this.price = price;
  }
}

/**
 *  行程
 */
class Trip {
  constructor(car) {
    this.car = car;
  }
  start() {
    return console.log(
      `这是${this.car.name}, 价格${this.car.price}, 车牌号为${this.car.number}`
    );
  }
  end() {
    return console.log(`路程还剩${this.car.price * 5}`);
  }
}

// 实例
let k1 = new SpeedCar('浙A Z1001', '大众', 1);
let t1 = new Trip(k1);
t1.start();
t1.end();

console.log('---------');
let z1 = new SpecialCar('浙A Z0001', '奔驰', 3);
let t2 = new Trip(z1);
t2.start();
t2.end();
