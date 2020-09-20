# 1. 防抖

```JavaScript

function debounce(func, timeout = 1000) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounce(task, 1000);

window.addEventListener('click', debounceTask)
```

**立即执行**

```JavaScript
function debounceImme(func, timeout = 1000,) {
    let timer;
    return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);

        let callNow = !timer;

        timer = setTimeout(() => {
            timer = null;
        }, timeout);

        if (callNow) return func.apply(context, args);
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounceImme(task, 1000);

window.addEventListener('click', debounceTask)

```

**合并版本**

```JavaScript

function debounce(func, timeout = 1000, immediate) {
    let timer;
    return function (...args) {
        let context = this;
        if (timer) clearTimeout(timer);

        if(immediate) {

            let callNow = !timer;

            timer = setTimeout(() => {
                timer = null;
            }, timeout);

            if (callNow) return func.apply(context, args);
        } else {
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }
    }
}

const task = () => {
    console.log('run task');
}
const debounceTask = debounceImme(task, 1000);

window.addEventListener('click', debounceTask)

```

# 2. 节流

**定时器版本**

```JavaScript
function throttle(func, timeout = 1000) {
    let timer;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(this, args);
            }, timeout);
        }
    }
}

const task = () => {
    console.log('run task');
}
const throttleTask = throttle(task, 1000);

window.addEventListener('mousemove', throttleTask)
```

**时间戳版本**

```JavaScript
function throttle(func, timeout = 1000) {
    let previous = 0;
    return function (...args) {
        let start = +new Date();
        let context = this;
        if (start - previous > timeout) {
            func.apply(context, args);
            previous = start;
        }
    }

}

const task = () => {
    console.log('run task');
}
const throttleTask = throttle(task, 1000);

window.addEventListener('mousemove', throttleTask)
```

# 3. new

```javascript
/**
 *  new
 *  创建一个新对象
 *  将构造函数的this指向这个对象
 *  执行函数
 *  返回新对象(实例化对象)
 */
function createNew(Func, ...args) {
  const instance = {};
  // instance.__proto__ = Func.prototype;
  // Object.setPrototypeOf(instance, Func.prototype);
  Reflect.setPrototypeOf(instance, Func.prototype);
  const res = Func.apply(instance, args);
  console.log(res);
  if (typeof res === 'function' || (typeof res === 'object' && res !== null))
    return res;
  return instance;
}
// 测试

/**
 *  Uncaught TypeError: Class constructor Person cannot be invoked without 'new'
 */
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     sayName() {
//         console.log(`My name is ${this.name}`)
//     }
// }
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(`My name is ${this.name}`);
};

const me = createNew(Person, 'Jack');
me.sayName();
console.log(me);
```

# 04. bind

```javascript
Function.prototype.createBind = function (context = globalThis) {
  const fn = this; // 指向函数say
  const args = Array.from(arguments).slice(1);
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {
      // 通过 new 调用，绑定 this 为实例对象
      fn.apply(this, newArgs);
    } else {
      // 通过普通函数形式调用，绑定 context
      fn.apply(context, newArgs);
    }
  };
  // 支持 new 调用方式
  newFunc.prototype = Object.create(fn.prototype);
  return newFunc;
};

// 测试
const me = { name: 'Jack' };
const other = { name: 'Jackson' };
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
const meSay = say.createBind(me);
meSay();
const otherSay = say.createBind(other);
otherSay();
```

# 05. call

```javascript
Function.prototype.createCall = function (context = globalThis) {
  const key = Symbol('key');
  context[key] = this;
  let args = Array.from(arguments).slice(1);
  let res = context[key](...args);
  Reflect.deleteProperty(context, key);
  return res;
};

// 测试
const me = { name: 'Jack' };
function say() {
  console.log(`My name is ${this.name || 'default'}`);
  return this.name;
}
say.createCall(me);
```

# 06. apply

```javascript
Function.prototype.createApply = function (context = globalThis) {
  // 关键步骤，在 context 上调用方法，触发 this 绑定为 context，使用 Symbol 防止原有属性的覆盖
  const key = Symbol('key');
  context[key] = this;
  let res;
  if (arguments[1]) {
    res = context[key](...arguments[1]);
  } else {
    res = context[key]();
  }
  delete context[key];
  return res;
};

// 测试
const me = { name: 'Jack' };
function say() {
  console.log(`My name is ${this.name || 'default'}`);
}
say.createApply(me);
```

# 07. deepClone

```javascript

```
