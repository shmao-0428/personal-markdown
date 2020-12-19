let data = {
  m: 234,
  n: [1, 34, 4, 5676],
  h: {
    c: 34,
  },
};
function arrayMethods() {
  const arrProto = Array.prototype;

  const arrayMethods = Object.create(arrProto);

  const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

  methods.forEach(function (method) {
    const original = arrProto[method];

    Object.defineProperty(arrayMethods, method, {
      value: function v(...args) {
        console.log('set arrayMethods');
        return original.apply(this, args);
      },
    });
  });
  return arrayMethods;
}

function observer(data) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods();
    } else {
      Object.keys(data).forEach((key) => {
        defineReactive(data, key, data[key]);
      });
    }
  }
}

function defineReactive(obj, key, val) {
  observer(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log('get');
      return val;
    },
    set(newVal) {
      console.log('set');
      if (newVal !== val) val = newVal;
    },
  });
}

observer(data);
console.log(data.h.c);
console.log(data.n[0]);
