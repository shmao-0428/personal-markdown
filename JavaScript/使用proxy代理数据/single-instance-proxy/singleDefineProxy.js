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

/** 降级兼容proxy */
function singleDefine(obj, fn) {
  let _obj = {};
  let result = {};
  Object.keys(obj).forEach((key) => {
    Object.defineProperty(result, key, {
      get() {
        console.log('obj>>', obj);
        if (!_obj[key]) _obj[key] = fn(obj, key);
        return _obj[key];
      },
      set(val) {
        console.log('set>>', key, val);
        _obj[key] = val;
      },
    });
  });
  return result;
}

function setData(obj, key) {
  //   console.log('key>>>', key);
  return obj[key] ? obj[key] : (obj[key] = { name: 11, code: 11 });
}

let d = singleDefine(data, setData);
// console.log(d[0]);
// console.log(d[1]);

// console.log(d[10]);

let o = singleDefine(obj, setData);
console.log(o.a);
// console.log(o.b);
o.c = { name: 3 };
o = singleDefine(o, setData);
console.log(o.c);
// console.log(obj);
