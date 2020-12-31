/*
 * @Author: shmao
 * @Date: 2020-12-29 09:00:17
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-29 09:12:51
 */
const TYPE_ENUM: string[] = ["String", "Object", "Array", "Symbol", "Boolean", "Date", "Number", "Function", "Null", "Undefined"];
const fns: any = {};
TYPE_ENUM.forEach((type) => {
  fns[`is${type}`] = isType(type);
});

function isType(type:string): (value:any)=>boolean {
  return function(value: any):boolean {
    // return Object.prototype.toString.call(value) === `[object ${type}]`;
    return Object.prototype.toString.call(value).includes(type);
  };
}

export default fns;