# JS 中的 Reflect 和 Proxy

`Proxy`和`Reflect`是 ES6 新增 API。

## Reflect

`Reflect`是一个内置的对象，它提供拦截 JavaScript 操作的方法。Reflect不是一个函数对象，因此它是不可构造的。`Reflect`的所有的方法都是静态的就和`Math`一样，目前它还没有静态属性。

`Reflect`对象的方法与`Proxy`对象的方法相同。

`Reflect` 一共有13个静态方法：

它可以分为一部分是是原来存在`Object`上的方法，将它转义到了`Reflect`上，并作了小改动，让方法更加合理。

1. `defineProperty` 与[Object.defineProperty](https://juejin.im/post/6844903788642484237#heading-1)类似，但是当对象无法定义时`Object.defineProperty`会报错而`Reflect.defineProperty`不会，它会返回`false`，成功时返回`true`，如果不是对象还是会报错。
2. `getPrototypeOf(target)` 与`Object.getPrototypeOf`一样，返回指定对象的原型。
3. `setPrototypeOf(target, prototype)` 与`Object.setPrototypeOf`一样，它将指定对象的原型设置为另外一个对象。
4. `getOwnPropertyDescriptor()` 与`Object.getOwnPropertyDescriptor`一样，如果在对象中存在，则返回给定的属性的[属性描述符](https://juejin.im/post/6844903788642484237#heading-1)。
5. `isExtensible(target)` 与`Object.isExtensible`类似，判断一个对象是否可扩展（是否可以在它上面添加新的属性），它们的不同点是，当参数不是对象时（原始值），`Object`的将它强制转变为一个对象，`Reflect`是直接报错。
6. `preventExtensions(target)` 与`Object.preventExtensions`类似，阻止新属性添加到对象，不同点和上一条一样。
7. `apply(func, thisArg, args)` 与`Function.prototype.apply.call(fn, obj, args)`一样。
8. `ownKeys(target)` 与`Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))`一样，返回一个包含所有自身属性（不包含继承属性）的数组

另一部分是将原来操作符的功能，变成函数行为。

1. `has(target, key)` 与`in`操作符一样，让判断操作都变成函数行为。
2. `deleteProperty(target, key)` 与`delete`操作符一样，让删除操作变成函数行为，返回布尔值代表成功或失败。
3. `construct(target, argumentsList[, newTarget])` 与`new`操作符一样，`target`构造函数，第二参数是构造函数参数类数组，第三个是[new.target](https://juejin.im/post/6844903788642484237#heading-4)的值。
4. `get(target, key[, receiver])` 与`obj[key]`一样，第三个参数是当要取值的`key`部署了`getter`时，访问其函数的`this`绑定为`receiver`对象。
5. `set(target, key, value[, receiver])` 设置`target`对象的`key`属性等于`value`，第三个参数和`set`一样。返回一个布尔值。

```javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true

// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1

// 旧写法
delete myObj.foo;

// 新写法
Reflect.deleteProperty(myObj, 'foo');

// new 的写法
const instance = new Greeting('张三');

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三']);

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now()
});

Reflect.get(1, 'foo') // 报错
Reflect.get(false, 'foo') // 报错
Reflect.set(1, 'foo', {}) // 报错
Reflect.set(false, 'foo', {}) // 报错

// ---------------

var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
复制代码
```

## Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等），等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

Proxy 就像在目标对象之间的一个代理，任何对目标的操作都要经过代理。代理就可以对外界的操作进行过滤和改写。

`Proxy`是构造函数，它有两个参数`target`和`handler`，

`target`是用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

`handler`是一个对象，其属性是当执行一个操作时定义代理的行为的函数。

```javascript
var obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log(`setting ${key}!`);
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1
//  setting count!
++obj.count
//  getting count!
//  setting count!
//  2
复制代码
```

`Proxy`只有一个静态方法`revocable(target, handler)`可以用来创建一个可撤销的代理对象。两个参数和构造函数的相同。它返回一个包含了所生成的代理对象本身以及该代理对象的撤销方法的对象。

一旦某个代理对象被撤销，它将变的几乎完全不可用，在它身上执行任何的可代理操作都会抛出 TypeError 异常（注意，可代理操作一共有 14 种，执行这 14 种操作以外的操作不会抛出异常）。一旦被撤销，这个代理对象永远不可能恢复到原来的状态，同时和它关联的目标对象以及处理器对象将有可能被垃圾回收掉。调用撤销方法多次将不会有任何效果，当然，也不会报错。

```javascript
var revocable = Proxy.revocable({}, {
  get(target, name) {
    return "[[" + name + "]]";
  }
});

// revocable -> {"proxy": proxy, "revoke": revoke}

var proxy = revocable.proxy;
proxy.foo;              // "[[foo]]"

revocable.revoke();     // 执行撤销方法

proxy.foo;              // TypeError
proxy.foo = 1           // 同样 TypeError
delete proxy.foo;       // 还是 TypeError
typeof proxy            // "object"，因为 typeof 不属于可代理操作
复制代码
```

`handler`参数是代理函数对象，它一共支持 13 种拦截函数。和`Reflect`的相同。如果没有定义某种操作，那么这种操作会被转发到目标对象身上。

```javascript
const proxy = new Proxy({}, {
  get: function(target, property, receiver) {
    return receiver;
    // receiver 总是指向原始的读操作所在的那个对象，一般情况下就是 Proxy 实例。
  }
});
proxy.getReceiver === proxy // true
复制代码
```

如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

```javascript
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});

const handler = {
  get(target, propKey) {
    return 'abc';
  }
};

const proxy = new Proxy(target, handler);

proxy.foo
// TypeError: Invariant check failed
复制代码
```

`apply`方法拦截函数的`调用`、`call`和`apply`操作。

```javascript
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"
复制代码
```

`defineProperty`方法拦截了`Object.defineProperty`操作。

```javascript
var handler = {
  defineProperty (target, key, descriptor) {
    return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
// defineProperty 方法返回 false，导致添加新属性总是无效。
复制代码
```

注意，如果目标对象不可扩展（non-extensible），则defineProperty不能增加目标对象上不存在的属性，否则会报错。另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则defineProperty方法不得改变这两个设置。

`getPrototypeOf`方法主要用来拦截获取对象原型，会以下这些操作：

1. `Object.prototype.__proto__`
2. `Object.prototype.isPrototypeOf()`
3. `Object.getPrototypeOf()`
4. `Reflect.getPrototypeOf()`
5. `instanceof`

`ownKeys`方法用来拦截对象自身属性的读取操作，会拦截以下操作：

1. `Object.getOwnPropertyNames()`
2. `Object.getOwnPropertySymbols()`
3. `Object.keys()`
4. `for...in`

通过代理，你可以轻松地验证向一个对象的传值。

```javascript
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

    // The default behavior to store the value
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age); 
// 100

person.age = 'young'; 
// 抛出异常: Uncaught TypeError: The age is not an integer

person.age = 300; 
// 抛出异常: Uncaught RangeError: The age seems invalid
复制代码
```

### this 指向

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理，即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理。

```javascript
const target = {
  m: function () {
    console.log(this === proxy);
  }
};
const handler = {};

const proxy = new Proxy(target, handler);

target.m() // false
proxy.m()  // true
复制代码
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);

proxy.getDate();
// TypeError: this is not a Date object.

// getDate 方法只能在Date对象实例上面拿到，
// 如果this不是Date对象实例就会报错。
// 这时，this绑定原始对象，就可以解决这个问题

const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    if (prop === 'getDate') {
      return target.getDate.bind(target);
    }
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);

proxy.getDate() // 1
```