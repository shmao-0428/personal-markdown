/*
 * @Author: shmao
 * @Date: 2020-12-25 08:58:27
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-25 09:07:00
 */
const TYPE_ENUM = ["String", "Object", "Array", "Symbol", "Boolean", "Date", "Number", "Function", "Null", "Undefined"];

const fns = {};
TYPE_ENUM.forEach((type) => {
  fns[`is${type}`] = isType(type);
});

function isType(type) {
  return function(value) {
    // return Object.prototype.toString.call(value) === `[object ${type}]`;
    return Object.prototype.toString.call(value).includes(type);
  };
}

/** demo */
// console.log(fns.isString('1'));
// console.log(fns.isNumber(1));
// console.log(fns.isArray([1,2,3]));
// console.log(fns.isBoolean(true));

export default fns;