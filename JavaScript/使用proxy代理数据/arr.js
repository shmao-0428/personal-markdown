// const arr = [1, 23, 3];
const arr = [{ a: 1 }, { a: 2 }];
const state = new Proxy(arr, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    /**
     * target [ 1, 23, 3 ]
     * key 3
     * value 4
     * target [ 1, 23, 3, 4 ]
     * key length
     * value 4
     */
    console.log("target", target);
    console.log("key", key);
    console.log("value", value);
    target[key] = value;
    // 如果没有返回值true
    // TypeError: 'set' on proxy: trap returned falsish for property '2'
    return true;
  },
});
// 代理数组配置 需要返回true
// state.push(4);
state.push({ a: 3 });
