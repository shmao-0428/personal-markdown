// bind内部机制就是柯里化
Function.prototype.bind = function (context) {
  var _this = this;
  var args = Array.prototype.slice.call(arguments, 1);

  return function () {
    return _this.apply(context, args);
  };
};

