/*
 * @Author: shmao
 * @Date: 2020-10-03 20:05:07
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-03 20:12:17
 */
function create(proto) {
  function F() {}
  F.prototype = proto;
  return new F();
}
