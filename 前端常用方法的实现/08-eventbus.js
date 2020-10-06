/*
 * @Author: shmao
 * @Date: 2020-09-20 17:00:12
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-03 18:12:29
 */

/**
 *  on 注册事件
 *  emit 触发 分发事件
 */

class EventBus {
  constructor() {
    this.cache = {};
  }
  on(eventName, eventCallback) {
    if (!eventName) throw TypeError('invalid event name');
    if (this.cache[eventName]) {
      this.cache.push(eventCallback);
    } else {
      this.cache[eventName] = [eventCallback];
    }
  }
  emit(eventName, ...args) {
    const target = this.cache[eventName] || [];
    for (const item of target) {
      item(...args);
    }
  }
  off(eventName, eventCallback) {
    if (this.cache[eventName]) {
      const res = Reflect.deleteProperty(this.cache, eventName);
      typeof eventCallback === 'function' && res && eventCallback();
    }
  }
}

const eventbus = new EventBus();
