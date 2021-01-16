/** Symbol.for()方法接受一个字符串作为参数，然后全局搜索有没有以该参数作为描述值的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局
悄悄告诉你：即使是在闭包函数中通过Symbol.for()方法生成的值，也会在全局中能被使用哦~ */
let _a = Symbol.for('唯一的');
let _b = Symbol.for('唯一的');
_a === _b; // true
