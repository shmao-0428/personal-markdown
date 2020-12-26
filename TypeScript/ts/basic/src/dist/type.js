/** boolean */
var a;
// let _a: boolean = false;
a = true;
/** string */
var b;
b = 'hello';
/** number */
var c;
c = 123;
/** 字面量: 就是本身 */
var d;
d = 10;
// d = 1; // error
var e;
e = 123;
var f;
f = 123;
f = 'hello';
/** any: 任意类型, 意味着失去ts的静态检查 */
var h; // 默认就是任意类型
h = 1;
h = '2';
h = true;
var i;
var _i;
_i = 1;
// _i = 'fsfs'; // error
_i = i; // 此时 _i 将失去ts类型检测, 所以不建议使用any类型声明
/** unknown: 类型安全的any */
var j = 4;
// _i = j; // error
j = 'hello';
/** void: 空或undefined */
function add(a, b) {
    // return a + b; // error
}
/** never: 不能是任何值 */
function error() {
    throw new Error();
}
/** object */
var k;
k = { a: 1, b: 'sll' };
// let m: {};
var m;
// m = { a: 1 };
m = { name: 'hello', age: 12, sex: 'male' };
var r;
r = function increment(a, b) {
    return a + b;
};
/** array */
var o;
var p;
var q;
var s;
/** tuple: 元祖, 固定数组长度 */
var t;
t = ['hello', 13];
/** enum */
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
var u;
u = { name: 'zs', gender: Gender.male };
u.gender === Gender.male;
/** &: 且 */
var y; //不存在 无意义
var z;
z = { name: 'zs', age: 18 }; // 合并对象
// let v: 1 | 2 | 3 | 4 | 5;
// let w: 1 | 2 | 3 | 4 | 5;
var v;
v = 1;
// v = 6; // error
/** 类型断言 */
var someValue = 'this is a string';
var strLength = someValue.length;
var _strLength = someValue.length;
/** 泛型: 在定义函数或者类时, 如果遇到类型不明确就可以用泛型 */
function generic(a) {
    return a;
}
/** 不指定泛型 ,ts会直接对类型进行推断 */
generic(10);
/** 遇到复杂的类型 可以直接指定泛型 */
generic('hello');
/** 指定多个泛型 */
function generic2(a, b) {
    return a;
}
generic2('hello', 1);
function generic3(a) {
    return a.length;
}
generic3('123');
generic3({ length: 1 });
// generic3<{ length: number }>({ length: '1' }); // error
/** 在类中使用泛型 */
var MyClass = /** @class */ (function () {
    function MyClass(name) {
        this.name = name;
    }
    return MyClass;
}());
var mc = new MyClass('hello');
var mc1 = new MyClass('hello');
