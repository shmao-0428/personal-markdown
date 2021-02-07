# defineproperty和proxy对比总结

- defineproperty
    - 无法动态拦截属性, 并且需要静态注册属性
    - 监听不到数组下表的变化
    - 监听不到对象新增属性的变化
    - 监听对象的属性 需要深度监听 并且监听的对象必须提前声明
    - 监听数组可以通过改写原生的方法去监听 并触发相应的函数方法
- proxy
    - 可以动态拦截属性, 但是也会拦截我们不需要拦截的属性
        - 比如我只想拦截slice,但是length,constructor这种你不需要响应的属性也响应了.这样程序就有了额外的负担.
    - 可以监听到数组的新增 删除 ... 
    - 可以监听到对象的新增 修改 ...
    - 在`setter`中 需要返回值 `return value = newValue`, 否则修改数组时会报错, 因为proxy会监听所有的属性包括数组的下标和length属性
    - Proxy 的兼容性不好, 可以参考[文章](https://juejin.cn/post/6907925026532491278)
    - set方法需要返回布尔值true, 如果某个属性，不可写，不可配置，那么set不得改变这个属性的值，只能返回同样的值，否则报错。
        - [set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set) 方法应当返回一个布尔值。
            - 返回 `true` 代表属性设置成功。
            - 在严格模式下，如果 `set()` 方法返回 `false`，那么会抛出一个 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 异常。

```js
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```

