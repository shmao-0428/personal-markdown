# [js 代理(Proxy) 和 反射(Reflection)](https://www.cnblogs.com/dengxiaoning/p/11681242.html)

> 在实际开发中经常会遇到 js 抛出的错误，但是我们有没有想过自己去接管 js 异常验证，根据自己的需求抛出异常呢？原本也许不行，但是在 es6 出来后就可以做到了

## 一、代理(Proxy)

什么是‘代理’ 呢？代理：就是调用 new 创建一个和目标（traget）对象一直的虚拟化对象，然该代理中就可以拦截 JavaScript 引擎内部目标的底层对象的操作；这些底层操作被拦截后会触发响应特定操作的陷阱函数
来看个简单的案例

```js
let tartget = {};
let proxy = new Proxy(target, {});
proxy.name = 'proxy';
console.log(proxy.name); // proxy
console.log(tartget.name); // proxy

tartget.name = 'tartget';
console.log(proxy.name); // target
console.log(tartget.name); // target
```

如案例
如`proxy.name = 'proxy';` 将 proxy 赋值给 proxy.name 时，代理就会将该操作转发给目标，执行 name 属性的创建；然而他只是做转发而不会存储该属性；
so 他们之间存在一个相互引用；tartget .name 设置一个新值后，proxy.name 值也改变了；

## 二、反射(Reflect)

那反射又是什么呢？反射：它提供了一个 Reflect 对象 API;该对像中的方法默认特性与底层的操作对应；而每一个代理陷阱会对应一个命名和参数都相同的 Reflect 方法（其实就是每个代理陷阱都会对应一个 Reflect api 接口供覆写 JavaScript 底层操作） [优点](https://www.cnblogs.com/diligenceday/p/5474126.html)

映射关系如下表：

| 代理陷阱                 | 覆写的特性                                                                      | 默认特性                           |
| ------------------------ | ------------------------------------------------------------------------------- | ---------------------------------- |
| get                      | 读写一个属性值                                                                  | Reflect.get()                      |
| set                      | 写入一个属性                                                                    | Reflect.set()                      |
| has                      | in 操作                                                                         | Reflect.has()                      |
| deleteProperty           | delete 操作符                                                                   | Reflect.deleteProperty()           |
| getAPrototypeof          | Object.getAPrototypeof ()                                                       | Reflect.getAPrototypeof ()         |
| setAPrototypeof          | Object.setAPrototypeof ()                                                       | Reflect.setAPrototypeof ()         |
| isExtensible             | Object.isExtensible()                                                           | Reflect.isExtensible()             |
| preventExtensions        | Object.preventExtensions()                                                      | Reflect.preventExtensions()        |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor()                                               | Reflect.getOwnPropertyDescriptor() |
| defineaProperty          | Object.defineaProperty()                                                        | Reflect.defineaProperty()          |
| ownKeys                  | Object.keys() 、 Object.getOwnPropertyNames()和 Object.getOwnPropertySysmbols() | Reflect.ownKeys()                  |
| apply                    | 调用一个函数                                                                    | Reflect.apply()                    |
| construct                | 用 new 调用一个函数                                                             | Reflect.construct()                |

## 三、使用 set 陷阱验证属性

接下来使用 set 陷阱来验证一下对象属性赋值操作（如为对象新增属性，要求必须赋值为 int）

```js
let target = {
  name: 'target',
};
let proxy = new Proxy(target, {
  set(trapTarget, key, value, receiver) {
    //忽略不希望受到影响的已有属性
    if (!trapTarget.hasOwnProperty(key)) {
      if (isNaN(key)) {
        throw new TypeError('属性必须是数字哟，亲！');
      }
    }
    // 添加属性
    return Reflect.set(trapTarget, key, value, receiver);
  },
});

// 添加一个新属性
proxy.count = 1;
console.log(proxy.count); // 1
console.log(proxy.count); // 1

// 由于目标已有name属性，so 如上第一个if不成立(赋值成功)
proxy.name = 'proxy';
console.log(proxy.name); // proxy
console.log(proxy.name); // proxy

// 新建一个属性同时赋值一个非int 值，第一个if成立，第二个if验证isNaN(key) = true 即抛出异常
proxy.anotherName = 'proxy';
```

案例中`set(trapTarget,key,value,receiver)` 这个 set 陷阱默认接收 四个参数

- trapTarget 用于接收属性（代理的目标）的对象
- key 要写入的属性键（字符串或 Symbol 类型）
- value 被写入的属性的值
- receiver 操作发生的对象（通常是代理）

## 四、使用 get 陷阱验证对象结构

如

```js
let target = {};
console.log(target.name); // undefined
```

在 JavaScript 中调用一个对象不存在的属性不会报错，反而使用 undefined 代替被读取属性的值

而喝多时候会带来意想不到的 bug，现在我们可以使用 get 陷阱来验证该问题
依然看这个案例

```js
let proxy = new Proxy(target, {
  get(trapTarget, key, receiver) {
    //忽略不希望受到影响的已有属性
    if (!(key in receiver)) {
      throw new TypeError('sorry 亲！ 你找的 ' + key + ' 属性不存在。！');
    }
    // 添加属性
    return Reflect.get(trapTarget, key, receiver);
  },
});
// 添加一个属性，
proxy.name = 'proxy';
console.log(proxy.name); // proxy

// 读取一个不存在的属性  直接会抛出异常
console.log(proxy.nme);
```

如上使用 in 操作判断 receiver 中是否存在被读取的属性；如果没有抛出异常

其中`get(trapTarget,key,receiver)` 参数

- trapTarget 被读取属性源对象（代理的目标）
- key 要读取的属性键（字符串或 Symbol 类型）
- receiver 操作发生的对象（通常是代理）

## 五、函数代理 apply 和 construct 陷阱

使用这个两个陷阱来验证函数调用时的参数的正确性
如下案例

```js
// 参数求和
function sum (...values){
	return values.reduce((previous,current) => prvious + current, 0);
}

let sumProxy = new Proxy(sum,{
	apply:function(trapTarget,thisArg,argumentList){
		argumentList.forEach(arg => {
			if(typeof arg !== "number"){
				throw new TypeError("所有参数必须是数字，亲！");
			}
		});
		return Reflect.apply(trapTarget,thisArg,argumentList);
	},
	// 防止使用new 关键字调用
	construct:function(trapTarget,argumentList){
		throw new TypeError("亲，你不能这么干，该函数不能通过new调用。");
	}
});

// 测试哈
console.log(sumProxy(1,2,3,4)); // 10

// 传入一个非数字的属性值试试 【直接抛出异常】
console.log(sumProxy(1,“2”,3,4)); // 10

// 同样使用new调用 【直接抛出异常】
let result = new sumProxy();
```

apply 陷阱和 Reflect.apply()都接受同样的参数

- trapTarget 被执行的函数（代理的目标）
- thisArg 函数被调用时内部的 this 的值
- argumentList 传递给函数的参数数组

**当使用 new 调用函数时 会触发 construct 陷阱，接收的参数为**

- trapTarget 被执行的函数（代理的目标）
- argumentList 传递给函数的参数数组

其中 Reflect.construct()第三个参数是 newTarget 这是一个可选参数。用于指定该函数内部
new.target 的值
