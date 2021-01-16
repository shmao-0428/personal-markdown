# Symbol 的 基本使用

## 什么是 Symbol

**Symbol** 是 ES6 新增的一种基本数据类型。我们可以通过调用内置函数 Symbol() 创建，这个函数会动态的生成一个匿名、全局唯一的值。

举个例子吧：
Symbol 就好比我们的身份证号，没有谁的身份证号和别人是相同的，都是全国唯一的号码。

> Symbol 函数栈不能用 new 命令，因为 Symbol 是原始数据类型，不是对象。可以接受一个字符串作为参数，
> 为新创建的 Symbol 提供描述，用来显示在控制台或者作为字符串的时候使用，便于区分。

## Symbol 有什么用

> 一，避免对象的键被覆盖。Symbol 用于对象的属性名时，能保证对象不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
> 二，避免魔术字符串。魔术字符串的诠释是：在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js
// 有一天大冰块声明了一个对象
let obj = {
    a:1,
    b:2,
    ...
}

// 过了很久，同事小明用到了这个对象，不过因为对象里键值对繁多，并没有仔细筛查，小明给对象添加了新的键值对
obj.a = 100

// 此时obj的值为
obj = {
    a:100,
    ...
}

// 如果其他地方在用obj.a的值，就会出现一系列的错误

// 所以小明给obj对象添加属性时，可以写成

const a = Symbol('a');
obj[a] = 100;

// 此时obj的值为
obj = {
    a: 1,
    b: 2,
    Symbol(a): 100
}

```

而第二个用处就不太好理解了，我们要先理解魔术字符串的含义。

```js
const getUserInfo = state => {
	if(state == 'yes'){
    	 // 状态正确的后续操作
    }else if(state == 'no'){
     	 // 状态错误的后续操作
     }else{
         // 其他状态的后续操作
	}
}

// 在上述代码中，getUserInfo函数的传参"yes"和"no"都是魔术字符串，它们在多个接口中都被用到，不利于将来的修改和维护。
// Symbol适用于原先写成魔术字符串的地方，因为它能保证自己是全局唯一的值。

// 所以代码可改写如下
let status = {
    success: Symbol('success'),
    error: Symbol('error'),
    ...
}
const getUserInfo = state => {
	if(state === status.success){
    	 // 状态正确的后续操作
    }else if(state === status.error){
     	 // 状态错误的后续操作
     }else{
         // 其他状态的后续操作
	}
}

getUserInfo(status.success)
```

**另外需要注意的是:**

> Symbol 值作为属性名时，该属性是公有属性不是私有属性，可以在类的外部访问。
> 但是在 for...in 、 for...of 的循环中不会出现该属性，同时 Object.keys() 、 Object.getOwnPropertyNames() 也不会 返回该属性。
> 如果要读取到一个对象中的 Symbol 属性，可以通过 Object.getOwnPropertySymbols() 和 Reflect.ownKeys() 取到。

```js
const obj = {};
const a = Symbol('a');
obj[a] = 'a';
for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj); // []
Object.getOwnPropertySymbols(obj); // [Symbol(a)]
```

## Symbol 的方法

Symbol.for()
既然 Symbol()生成的是一个全局唯一的值，那我们如果想重复使用某个 Symbol()生成的值怎么办呢？

> Symbol.for()方法接受一个字符串作为参数，然后全局搜索有没有以该参数作为描述值的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局
> 悄悄告诉你：即使是在闭包函数中通过 Symbol.for()方法生成的值，也会在全局中能被使用哦~

```js
let a = Symbol.for('唯一的');
let b = Symbol.for('唯一的');
a === b; // true
```

在上面的代码中，let a 时全局检索有没有以"唯一的"作为描述值的 Symbol 值，发现没有就创建了一个 Symbol.for("唯一的")，let b 时全局检索有没有以"唯一的"作为描述值的 Symbol 值，发现有，于是直接把找到的 Symbol.for("唯一的")赋值给了 b，并没有重新去生成一个全局唯一的值。所以 a === b 为 true。

## Symbol.keyFor()

如果我们要获取到全局注册的 Symbol 类型值的描述值该怎么做呢？

这时候就可以使用 Symbol.keyFor()方法了。

> Symbol.keyFor()方法返回一个已全局注册的 Symbol 类型值的描述值，如果该 Symbol 类型值未全局注册，则返回 undefined。
> 它类似于通过 Symbol 值的属性 description 直接获取描述内容

```js
let a = Symbol.for('唯一的');
let b = Symbol('唯一的');
Symbol.keyFor(a); // 唯一的
Symbol.keyFor(b); // undefined
```

在上面的代码中，let a 时 Symbol.for()方法生成了一个全局注册的描述值为"唯一的"的 Symbol 值，所以 Symbol.keyFor(a)返回了描述值"唯一的"。
而 let b 时 Symbol()方法生成的值并不是全局注册的。所以 Symbol.keyFor(b)直接返回了 undefined。

## 参考链接

[《看完就懂系列》答应我，看完就开始用 Symbol 好吗？](https://juejin.cn/post/6918014088967061511?utm_source=gold_browser_extension#heading-1)
