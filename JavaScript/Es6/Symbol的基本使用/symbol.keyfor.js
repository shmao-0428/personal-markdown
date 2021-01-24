/** Symbol.keyFor()方法返回一个已全局注册的 Symbol 类型值的描述值，如果该 Symbol 类型值未全局注册，则返回undefined。
它类似于通过Symbol值的属性description直接获取描述内容 */
let c = Symbol.for('唯一的');
let d = Symbol('唯一的');
Symbol.keyFor(c); // 唯一的
Symbol.keyFor(d); // undefined

/** 在上面的代码中，let c时Symbol.for()方法生成了一个全局注册的描述值为"唯一的"的Symbol值，所以Symbol.keyFor(c)返回了描述值"唯一的"。
而let b时Symbol()方法生成的值并不是全局注册的。所以Symbol.keyFor(d)直接返回了undefined。 */
