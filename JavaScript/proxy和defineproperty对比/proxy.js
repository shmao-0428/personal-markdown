let data = {
  m: 234,
  n: [1, 34, 4, 5676],
  h: {
    c: 34,
  },
};
// https://juejin.cn/post/6907028003469918222?utm_source=gold_browser_extension
function defineReactive(obj) {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      obj[key] = defineReactive(obj[key]);
    }
  });
  return new Proxy(obj, {
    get(target, key) {
      console.log('get');
      return target[key];
    },
    set(target, key, val) {
      console.log('set', key, val);
      return (target[key] = val);
    },
  });
}

data = defineReactive(data);
// console.log(data.h.c);
// console.log(data.n[0])
let n = data.n
// n[2] = { name: 1 }
// n[2].name = '1'
// console.log(typeof n[2].name);

n.push(13)
n[n.length - 1] = { name:1 }
n[n.length - 1].name = '1'
console.log(typeof n[n.length - 1].name);