/*
 * @Author: shmao
 * @Date: 2020-12-08 14:46:15
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-14 09:34:10
 */
const Types = ["String", "Boolean", "Object", "Function", "Null", "Undefined", "Array", "Date", "Number"];

// function _isType(type, name) {
//   return Object.prototype.toString.call(type).includes(name);
// }

// console.log(_isType(2, "Number"));

// 柯里化
function isType(type) {
  return function (value) {
    return Object.prototype.toString.call(value).includes(type);
  };
}

const fns = {};
Types.forEach(type=>{
  fns[`is${type}`] = isType(type);
})

const fn = isType("Number");

console.log(fn(2));

console.log(fns.isNumber(2));