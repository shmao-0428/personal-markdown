/*
 * @Author: shmao
 * @Date: 2020-12-08 14:46:15
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-08 14:57:28
 */
const Types = ["String", "Boolean", "Object", "Function", "Null", "Undefined", "Array", "Date", "Number"];

// function _isType(type, name) {
//   return Object.prototype.toString.call(type).includes(name);
// }

// console.log(_isType(2, "Number"));

function isType(type) {
  return function (value) {
    return Object.prototype.toString.call(value).includes(type);
  };
}

const fn = isType("Number");

console.log(fn(2));
