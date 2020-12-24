let obj = {
  f: 1,
  a: {
    g: 1,
    b: {
      h: 1,
      c: {
        d: 1,
      },
    },
  },
};

let arr = [{ a: 1, c: { d: 1 } }, { b: 1 }];

function reactive(obj) {
  if (typeof obj === 'object') {
    if (obj instanceof Array) {
      obj.forEach((item, index) => {
        if (typeof item === 'object') {
          obj[index] = reactive(item);
        }
      });
    } else {
      for (const key in obj) {
        if (typeof obj[key] === 'object') {
          obj[key] = reactive(obj[key]);
        }
      }
    }
    return defineReactive(obj);
  }
}

function defineReactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      console.log(`.${key}触发tirgger事件`);
      return true;
    },
  });
}

const objProxy = reactive(obj);

objProxy.f = 3;
objProxy.a.b = 2;

const arrProxy = reactive(arr);
arrProxy.push({ c: 1 });
arrProxy[0].c.d = 2;
console.log(arr);

export { defineReactive, reactive };
