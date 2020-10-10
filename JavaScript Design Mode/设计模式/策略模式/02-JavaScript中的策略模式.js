/*
 * @Author: shmao
 * @Date: 2020-10-06 19:42:21
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 22:20:10
 */
(function () {
  var strategies = {
    S: function (salary) {
      return salary * 4;
    },
    A: function (salary) {
      return salary * 3;
    },
    B: function (salary) {
      return salary * 2;
    },
  };
  var calculateBonus = function (level, salary) {
    return strategies[level](salary);
  };
  console.log(calculateBonus('S', 20000)); // 输出：80000
  console.log(calculateBonus('A', 10000)); // 输出：30000
})();

(function () {
  function calculateBonus(salay, performanceLevel) {
    return salay * levels(performanceLevel);
  }
  function levels(performanceLevel) {
    // 可以减少if...else...的使用
    const levels = {
      C: 1,
      B: 2,
      A: 3,
      S: 4,
    };
    return levels[performanceLevel];
  }
  console.log(calculateBonus(8000, 'C'));
  console.log(calculateBonus(10000, 'B'));
  console.log(calculateBonus(15000, 'A'));
  console.log(calculateBonus(20000, 'S'));
})();
