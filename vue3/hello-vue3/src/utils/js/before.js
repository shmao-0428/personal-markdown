/*
 * @Author: shmao
 * @Date: 2020-12-25 09:06:13
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-25 09:10:57
 */

 /** 前置执行 类似装饰器 */
function before(fn) {
    const that = this;
    return (function() {
        /** do something */
        fn();
        that();
    })()
}

Function.prototype.before = before;

/** demo */
// function demo () {
//     console.log('this is a demo function');
// }

// demo.before(() => {
//     console.log('this is a before function');
// })