/** 模拟vue的$nextTick */

let callbacks = [];
let pending = false;
/** flushCallback */
function flushCallback() {
  pending = false;
  let copies = callbacks.slice();
  callbacks.length = 0;
  copies.forEach((fn) => {
    fn();
  });
}

let microFunc = () => {
  return Promise.resolve().then(flushCallback);
};

function nextTick(fn) {
  callbacks.push(() => {
    fn && fn.call();
  });
  if (!pending) {
    pending = true;
    microFunc();
  }
}
console.log(1);
nextTick(() => {
  console.log(2);
});

console.log(3);
setTimeout(() => {
  console.log(5);
});
nextTick(() => {
  console.log(4);
});
