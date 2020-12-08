/*
 * @Author: shmao
 * @Date: 2020-12-08 14:58:12
 * @LastEditors: shmao
 * @LastEditTime: 2020-12-08 15:14:03
 */
function after(times, fn) {
    return function (value) {
    --times;
    if (times === 0) {
      fn(value);
    }
  };
}

const fn = after(2, function (value) {
  console.log("执行fn", value);
});

fn();
fn('参数');
fn();
