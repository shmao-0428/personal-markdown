"use strict";
exports.__esModule = true;
/*
 * @Author: shmao
 * @Date: 2020-12-29 09:00:17
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-29 09:12:51
 */
var TYPE_ENUM = ["String", "Object", "Array", "Symbol", "Boolean", "Date", "Number", "Function", "Null", "Undefined"];
var fns = {};
TYPE_ENUM.forEach(function (type) {
    fns["is" + type] = isType(type);
});
function isType(type) {
    return function (value) {
        // return Object.prototype.toString.call(value) === `[object ${type}]`;
        return Object.prototype.toString.call(value).includes(type);
    };
}
exports["default"] = fns;
