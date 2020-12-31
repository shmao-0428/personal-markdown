/*
 * @Author: shmao
 * @Date: 2020-12-28 10:11:12
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-29 09:19:10
 */
/** 前置执行 */
function before(fn) {
    var that = this;
    return (function () {
        fn();
        that();
    })();
}
Function.prototype.before = before;
