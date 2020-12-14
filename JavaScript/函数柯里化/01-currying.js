/**
 * 柯里化，英语：Currying(果然是满满的英译中的既视感)，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
 */

function add(x, y) {
  return x + y;
}

function add(x) {
  return function (y) {
    return x + y;
  };
}
console.log(add(1)(2));

var add = function (a) {
  var sum = a;
  var addMore = function (b) {
    sum += b;
    return addMore;
  };
  addMore.toString = function () {
    return sum;
  };
  return addMore;
};

var a = add(1)(2)(3)(4).toString(); //10
console.log(a);
