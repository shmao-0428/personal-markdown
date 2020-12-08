/*
 * @Author: shmao
 * @Date: 2020-12-08 14:57:51
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-08 15:06:17
 */
function demo () {
    console.log('这里后执行了demo');
}

Function.prototype.before = function(fn) {
    const that = this;
    return (function() {
        fn();
        that();
    })()
}

demo.before(() => {
    console.log('这里先执行before');
});
