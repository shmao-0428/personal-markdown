import Vue$1 from 'vue';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

/**
 *  事件队列
 */

var _vm = new WeakMap();

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    _vm.set(this, {
      writable: true,
      value: new Vue$1()
    });
  }

  _createClass(EventBus, [{
    key: "emitEvent",
    value:
    /**
     *  消息推送
     *  @param { string } eventName 事件名称
     *  @param { string | Object | Array } args 参数
     */
    function emitEvent(eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args[0].length === 1) {
        _classPrivateFieldGet(this, _vm).$emit(eventName, args[0][0]);
      } else {
        _classPrivateFieldGet(this, _vm).$emit(eventName, args[0]);
      }
    }
    /**
     *  事件监听
     *  @param eventName 事件名称
     *  @param eventCallback 事件回调函数
     */

  }, {
    key: "onEvent",
    value: function onEvent(eventName, eventCallback) {
      _classPrivateFieldGet(this, _vm).$on(eventName, eventCallback);
    }
    /**
     * 关闭事件监听
     * @param eventName
     * @param eventCallback
     */

  }, {
    key: "offEvent",
    value: function offEvent(eventName, eventCallback) {
      if (!eventName && !eventCallback) {
        _classPrivateFieldGet(this, _vm).$off();

        return;
      }

      _classPrivateFieldGet(this, _vm).$off(eventName, eventCallback);
    }
  }]);

  return EventBus;
}();

var eventbus = new EventBus();

/*
 * @Author: shmao
 * @Date: 2021-02-07 14:12:00
 * @LastEditors: shmao
 * @LastEditTime: 2021-02-07 14:12:17
 */
var mixins = {
  methods: {
    /**
     * 消息推送
     * @param {String} handleEvent 接收消息的事件句柄名称
     * @param {any[]} args 推送的消息
     */
    $emitEvent: function $emitEvent(handleEvent) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      eventbus.emitEvent(handleEvent, args);
    },

    /**
     * 自定义事件监听
     * @param {String} eventName 事件名称
     * @param {Function} eventCallbak 事件委托方法
     */
    $onEvent: function $onEvent(eventName, eventCallbak) {
      eventbus.onEvent(eventName, eventCallbak); //Vue组件销毁之前 钩子函数

      this.$once('hook:beforeDestroy', function () {
        eventbus.offEvent(eventName, eventCallbak);
      });
    },

    /**
     * 自定义事件关闭
     * @param {String} eventName 事件名称
     * @param {Function} eventCallbak 事件委托方法
     */
    $offEvent: function $offEvent(eventName, eventCallbak) {
      eventbus.offEvent(eventName, eventCallbak);
    }
  }
};

/*
 * @Author: shmao
 * @Date: 2021-02-07 14:12:00
 * @LastEditors: shmao
 * @LastEditTime: 2021-02-07 14:35:59
 */
var Vue;
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin(mixins);
}

export default install;
