/*
 * @Author: shmao
 * @Date: 2020-09-20 17:02:27
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-03 21:06:53
 */
function objectFlat(target = {}) {
  const result = {};
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      if (isObject(target[key])) {
        Object.assign(result, objectFlat(target[key]));
      } else {
        result[key] = target[key];
      }
    }
  }
  return result;
}

function isObject(t) {
  return Object.prototype.toString.call(t) === '[object Object]';
}

// 测试
const source = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(objectFlat(source)); //{ c: 1, d: 2, e: 3, g: 2 }
