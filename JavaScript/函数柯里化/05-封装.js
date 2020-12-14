// 初步封装
var currying = function (fn) {
  // args 获取第一个方法内的全部参数
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    // 将后面方法里的全部参数和args进行合并
    var newArgs = args.concat(Array.prototype.slice.call(arguments));
    // 把合并后的参数通过apply作为fn的参数并执行
    return fn.apply(this, newArgs);
  };
};

const c = currying(
  (...args) => {
    return args.reduce((a, b) => a + b);
  },
  1,
  2
)(2, 3);

console.log(c);

// 支持多参数传递
function progressCurrying(fn, args) {
  var _this = this;
  var len = fn.length;
  var args = args || [];

  return function () {
    var _args = Array.prototype.slice.call(arguments);
    Array.prototype.push.apply(args, _args);

    // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
    if (_args.length < len) {
      return progressCurrying.call(_this, fn, _args);
    }

    // 参数收集完毕，则执行fn
    return fn.apply(this, _args);
  };
}

const p = progressCurrying((...args) => {
  return args.reduce((a, b) => a + b);
}, 1)(2);

console.log(p);
