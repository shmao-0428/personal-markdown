/*
 * @Author: shmao
 * @Date: 2020-10-03 18:14:34
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-03 18:20:13
 */
class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn);
    } else {
      this.cache[name] = [fn];
    }
  }

  off(name, fn) {
    const tasks = this.cache[name];
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn || f.callback === fn);
      if (index >= 0) {
        tasks.splice(index, 1);
      }
    }
  }

  //   emit(name) {
  //     if (this.cache[name]) {
  //       // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
  //       const tasks = this.cache[name].slice();
  //       for (let fn of tasks) {
  //         fn();
  //       }
  //     }
  //   }

  emit(name, once = false) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      const tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn();
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}
