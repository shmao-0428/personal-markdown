'use strict';
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
// exports.__esModule = true;
// exports.throttleAndQueue = void 0;
/* limits your function to be called at most every W milliseconds, where W is wait.
 * Calls to your func that happen more often than W get queued up to be called later.
 * @param fn
 * @param wait
 */
function throttleAndQueue(fn, wait) {
  var isCalled = false;
  var callQueue = [];
  var caller = function () {
    if (callQueue && callQueue.length && !isCalled) {
      isCalled = true;
      var callable = callQueue.shift();
      if (callable) {
        callable();
      }
      setTimeout(function () {
        isCalled = false;
        caller();
      }, wait);
    }
  };
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    callQueue.push(fn.bind.apply(fn, __spreadArrays([this], args)));
    caller();
  };
}
// exports.throttleAndQueue = throttleAndQueue;
