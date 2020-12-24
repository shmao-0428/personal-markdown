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
  if (typeof obj === "object") {
      if(obj instanceof Array) {
          
      }
  }
}

function defineReactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  });
}
