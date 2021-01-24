/** 用于获取一个对象中所有方法的帮助函数 */
const getMethods = (obj) =>
  Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((item) => typeof obj[item] === 'function');

/** 将原始方法替换为自定义函数，该函数将在通知指示时调用我们的切面 */
function replaceMethod(target, methodName, aspect, advice) {
  const originalCode = target[methodName];
  target[methodName] = (...args) => {
    if (['before', 'around'].includes(advice)) {
      aspect.apply(target, args);
    }
    const returnedValue = originalCode.apply(target, args);
    if (['after', 'around'].includes(advice)) {
      aspect.apply(target, args);
    }
    if ('afterReturning' == advice) {
      return aspect.apply(target, [returnedValue]);
    } else {
      return returnedValue;
    }
  };
}

module.exports = {
  // 导出的主要方法：在需要的时间和位置将切面注入目标
  inject: function (target, aspect, advice, pointcut, method = null) {
    if (pointcut == 'method') {
      if (method != null) {
        replaceMethod(target, method, aspect, advice);
      } else {
        throw new Error('Tryin to add an aspect to a method, but no method specified');
      }
    }
    if (pointcut == 'methods') {
      const methods = getMethods(target);
      methods.forEach((m) => {
        replaceMethod(target, m, aspect, advice);
      });
    }
  },
};
