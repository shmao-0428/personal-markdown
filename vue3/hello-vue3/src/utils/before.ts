/*
 * @Author: shmao
 * @Date: 2020-12-28 10:11:12
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-28 16:54:22
 */

interface Fn {
    (): void
}
/** 前置执行 */
function before(this: any, fn: Fn) {
    const that = this;
    return (function() {
        fn();
        that();
    })()
}

Function.prototype.before = before;