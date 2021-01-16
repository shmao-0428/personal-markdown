# 深度克隆数组方法耗时对比

**研究数组三种深度克隆的耗时**

- 350kb 数据量下
- lodash > copy > json
- copy: 3.39208984375 ms
- json: 2.257080078125 ms
- lodash: 17.31494140625 ms
- 结论: 数量越大 lodash 越耗时, 但是功能健全, json 耗时最少, 但是 json 本身存在缺陷, 无法深度克隆 函数, symbol, undefined 等等
- Symbol 本身无法被 `forin` `forof` `Object.keys` 等方法遍历[https://blog.csdn.net/ixygj197875/article/details/79165199]
- 我们将 copy 方法改写 一下 将 Object.keys 方法改为 Reflect.owns 方法遍历
- 最后通过耗时对比 我们推荐使用**copy**方法

**耗时对比**

```js
console.time('copy');
let arrCopy = copy(arr);
console.timeEnd('copy');

console.time('deepcopy');
let arrDeepCopy = deepCopy(arr);
console.timeEnd('deepcopy');

console.time('json');
let clones = cloneJson(arr);
console.timeEnd('json');

console.time('lodash');
let deep = _.cloneDeep(arr);
console.timeEnd('lodash');
```

**使用 json 深度克隆的缺陷**

```js
let s = Symbol('a');
let obj = { a: [{ a: 1 }], b: undefined, c: null, [s]: 1, fn: () => {} };
let _obj = cloneJson(obj);
console.log(_obj); // {a: Array(1), c: null}
console.log('lodash', _.cloneDeep(obj)); // {a: Array(1), b: undefined, c: null, Symbol(a): 1, fn: ƒ}
console.log('copy', copy(obj)); // {a: Array(1), b: undefined, c: null, Symbol(a): 1, fn: ƒ}
console.log('deepcopy', deepCopy(obj)); // {a: Array(1), b: undefined, c: null, Symbol(a): 1, fn: ƒ}
```

**自定义通用方法**

```js
/** 方法一 */
function copy(data) {
  let result = Array.isArray(data) ? [] : {};
  return fn(data, result);
  function fn(data, result) {
    Reflect.ownKeys(data).forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        let value = data[k];
        if (typeof value === 'object' && value) {
          result[k] = Array.isArray(value) ? [] : {};
          return fn(value, result[k]);
        } else {
          result[k] = value;
        }
      }
    });
    return result;
  }
}

/** 方法二 */
function deepCopy(data) {
  let result = Array.isArray(data) ? [] : {};
  Reflect.ownKeys(data).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // console.log('key', key);
      let value = data[key];
      // console.log('value', value);
      if (typeof value === 'object' && value) {
        result[key] = deepCopy(value);
      } else {
        result[key] = value;
      }
    }
  });
  return result;
}

function cloneJson(data) {
  return JSON.parse(JSON.stringify(data));
}
```
