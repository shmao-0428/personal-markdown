/**
 * curry的一些性能问题你只要知道下面四点就差不多了:
 * 存取arguments对象通常要比存取命名参数要慢一点
 * 一些老版本的浏览器在arguments.length的实现上是相当慢的
 * 使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
 * 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上
 */

// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);

  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function () {
    _args.push(...arguments);
    return _adder;
  };

  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}

add(1)(2)(3); // 6
add(1, 2, 3)(4); // 10
add(1)(2)(3)(4)(5); // 15
add(2, 6)(1); // 9

const res = add(1)(2);
console.log(res.toString()); // 3
console.log(res == 3); // true
console.log(typeof res); // function
console.log(Number(res)); // 3
