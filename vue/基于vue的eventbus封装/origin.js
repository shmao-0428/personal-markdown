/*
 * @Author: shmao
 * @Date: 2020-08-03 10:09:37
 * @LastEditors: shmao
 * @LastEditTime: 2021-02-06 16:04:34
 */
import Vue from 'vue';

// const _vm = Symbol('_vm');

/**
 *  事件队列
 */
class EventBus {
  /**
   *  _vm = new Vue(); 隐式 私有属性 只是一种约束
   *  [_vm] = new Vue(); 可以使用symbol
   *  也可以 使用 #vm 表示 es6提案 私有属性 外部调用会报错
   */
  #vm = new Vue();

  /**
   *  消息推送
   *  @param { string } eventName 事件名称
   *  @param { string | Object | Array } args 参数
   */
  emitEvent(eventName, ...args) {
    if (args[0].length === 1) {
      this.#vm.$emit(eventName, args[0][0]);
    } else {
      this.#vm.$emit(eventName, args[0]);
    }
  }

  /**
   *  事件监听
   *  @param eventName 事件名称
   *  @param eventCallback 事件回调函数
   */
  onEvent(eventName, eventCallback) {
    this.#vm.$on(eventName, eventCallback);
  }

  /**
   * 关闭事件监听
   * @param eventName
   * @param eventCallback
   */
  offEvent(eventName, eventCallback) {
    if (!eventName && !eventCallback) {
      this.#vm.$off();
      return;
    }
    this.#vm.$off(eventName, eventCallback);
  }
}

const eventbus = new EventBus();

export default {
  methods: {
    /**
     * 消息推送
     * @param {String} handleEvent 接收消息的事件句柄名称
     * @param {any[]} args 推送的消息
     */
    $emitEvent(handleEvent, ...args) {
      eventbus.emitEvent(handleEvent, args);
    },
    /**
     * 自定义事件监听
     * @param {String} eventName 事件名称
     * @param {Function} eventCallbak 事件委托方法
     */
    $onEvent(eventName, eventCallbak) {
      eventbus.onEvent(eventName, eventCallbak);

      //Vue组件销毁之前 钩子函数
      this.$once('hook:beforeDestroy', () => {
        eventbus.offEvent(eventName, eventCallbak);
      });
    },
    /**
     * 自定义事件关闭
     * @param {String} eventName 事件名称
     * @param {Function} eventCallbak 事件委托方法
     */
    $offEvent(eventName, eventCallbak) {
      eventbus.offEvent(eventName, eventCallbak);
    },
  },
};
