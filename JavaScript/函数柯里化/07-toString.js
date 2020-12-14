function add() {
  return 10;
}

const r = add() + 1;

console.log(r);

const i = add + 1; // 隐式转换会默认调用toString

/**
 * function add() {
 *  return 10;
 * }1
 */
console.log(i);

add.toString = function () {
  return 10;
};

console.log(add + 10); // 20
