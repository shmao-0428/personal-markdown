let data = [
  { name: 1, code: 1 },
  { name: 2, code: 2 },
  { name: 3, code: 3 },
  { name: 4, code: 4 },
  { name: 5, code: 5 },
  { name: 6, code: 6 },
  { name: 7, code: 7 },
  { name: 8, code: 8 },
  { name: 9, code: 9 },
  { name: 0, code: 0 },
];

let obj = {
  a: { name: 1, code: 2 },
  b: { name: 2, code: 1 },
};

function singleProxy(obj, fn) {
  return new Proxy(obj, {
    get(target, key, receive) {
      console.log('key>>>', key);
      return target[key] ? Reflect.get(target, key, receive) : (target[key] = fn(obj, key));
    },
    set(target, key, value, receive) {
      console.log('set key>>>', key);
      return Reflect.set(target, key, value, receive);
    },
  });
}

function setData(obj, key) {
  console.log('setData>>>', key);
  return (obj[key] = { name: 11, code: 11 });
}

let p = singleProxy(data, setData);

// console.log(p[0]);
// console.log(p[11]);
// p[12] = { name: 12, code: 12 };
// console.log(p);

let o = singleProxy(obj, setData);
console.log(o.a);
console.log(o.b);
console.log(o.c);
