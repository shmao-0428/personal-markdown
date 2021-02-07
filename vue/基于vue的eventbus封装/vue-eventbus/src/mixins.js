/*
 * @Author: shmao
 * @Date: 2021-02-07 14:12:00
 * @LastEditors: shmao
 * @LastEditTime: 2021-02-07 14:12:17
 */
import eventbus from './eventsbus';
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