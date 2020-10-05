/*
 * @Author: shmao
 * @Date: 2020-10-05 22:38:42
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-05 23:37:47
 */

/**
 *  1.需求
 *  某停车场，分3层，每层100车位
 *  每个车位都能监控到车辆的驶入与离开
 *  车辆驶入前，显示每层的空余车位数量
 *  车辆驶入时，摄像头可识别车牌号和时间
 *  车辆离开时，出口显示器显示车牌号和停车时长
 */
// 0.0.1/park-car.js
const random = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const timestampToTime = (timestamp) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const month = date.getMonth() + 1;
  const M = (month < 10 ? '0' + month : month) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();

  return Y + M + D + h + m + s;
};

// 车
class Car {
  constructor(num) {
    this.num = num;
  }
}

// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now(),
    };
  }
}

// 出口显示屏
class Screen {
  show(car, inTime) {
    console.log(`车牌号 ${car.num}，停车时间 ${Date.now() - inTime} 毫秒`);
  }
}

// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {}; // 存储摄像头拍摄返回的车辆信息
  }

  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car);
    const i = random(1, 100);
    const j = random(1, 3);
    const place = this.floors[j].places[i]; // 第0层某个随机车位
    place.in();
    info.place = place;
    // 记录某车牌的信息
    this.carList[car.num] = info; // { num, inTime, place }
    // console.log(`车牌号${info.num} 在 ${timestampToTime(info.inTime)} 驶入`);
  }

  out(car) {
    // 获取信息
    const { place, inTime } = this.carList[car.num];
    place.out();
    // 显示时间
    this.screen.show(car, inTime);
    // console.log(`车牌号${car.num} 在 ${timestampToTime(Date.now())} 驶出`);
    // 清空记录
    delete this.carList[car.num];
  }

  emptyFloorsNum() {
    // 计算每层车位剩余多少
    return this.floors
      .map(
        (floor) => `${floor.index} 层还有 ${floor.emptyPlacesNum()} 个空车位`
      )
      .join('\n');
  }
}

// 层
class Floor {
  constructor(index, places) {
    this.index = index;
    this.places = places || [];
  }

  emptyPlacesNum() {
    // 计算每层车位剩余多少
    let num = 0;
    this.places.forEach((place) => {
      if (place.empty) {
        num += 1;
      }
    });
    return num;
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true;
  }

  in() {
    this.empty = false;
  }

  out() {
    this.empty = true;
  }
}

// 测试-----------
// 初始化停车场
const floors = [];
for (let i = 1; i < 4; i++) {
  const places = [];
  for (let j = 1; j < 101; j++) {
    places[j] = new Place();
  }
  floors[i] = new Floor(i, places);
}
const park = new Park(floors);

// 初始化车辆
const car1 = new Car(1001);
const car2 = new Car(1002);
const car3 = new Car(1003);

console.log('第1辆车进入，当前停车库停车情况');
console.log(park.emptyFloorsNum());
park.in(car1);
console.log('第2辆车进入，当前停车库停车情况');
console.log(park.emptyFloorsNum());
park.in(car2);

console.log('第1辆车离开');
park.out(car1);
console.log('第2辆车离开');
park.out(car2);

console.log('第3辆车进入，当前停车库停车情况');
console.log(park.emptyFloorsNum());
park.in(car3);
console.log('第3辆车离开');
park.out(car3);
