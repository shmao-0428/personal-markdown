/*
 * @Author: shmao
 * @Date: 2020-10-06 19:43:36
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 23:56:37
 */
const strategies = {
  isNonEmpty: function (value, errorMsg) {
    // 不为空
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    // 手机号码格式
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  },
};

class Validate {
  constructor() {
    this.caches = []; // 保存校验规则
  }
  add(dom, rule, errorMsg) {
    const ary = rule.split(':');
    this.caches.push(function () {
      const strategy = ary.shift();
      ary.unshift(dom.value);
      ary.push(errorMsg);
      return strategies[strategy].apply(dom, ary);
    });
  }
  start() {
    for (const validateFunc of this.caches) {
      const msg = validateFunc();
      if (msg) {
        return msg;
      }
    }
  }
}
