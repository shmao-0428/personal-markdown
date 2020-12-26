/** boolean */
let a: boolean;
// let _a: boolean = false;
a = true;

/** string */
let b: string;
b = 'hello'

/** number */
let c: number;
c = 123;

/** 字面量: 就是本身 */
let d: 10;
d = 10;
// d = 1; // error
let e: 'hello' | 'world' | 123;
e = 123;

let f: string | number;
f = 123;
f = 'hello';

/** any: 任意类型, 意味着失去ts的静态检查 */
let h; // 默认就是任意类型
h = 1;
h = '2';
h = true;

let i: any;
let _i: number;
_i = 1;
// _i = 'fsfs'; // error
_i = i; // 此时 _i 将失去ts类型检测, 所以不建议使用any类型声明

/** unknown: 类型安全的any */
let j: unknown = 4;
// _i = j; // error
j = 'hello';

/** void: 空或undefined */
function add(a: number, b: number): void {
    // return a + b; // error
}

/** never: 不能是任何值 */
function error(): unknown {
    throw new Error()
}

/** object */
let k: object;
k = { a: 1, b: 'sll' };

// let m: {};
let m: { name: string, age?: number, [propName: string]: any };
// m = { a: 1 };
m = { name: 'hello', age: 12, sex: 'male' }

let r: (a: number, b: number) => number;
r = function increment(a: number, b: number) {
    return a + b
}

/** array */
let o: [];
let p: string[];
let q: number[];
let s: Array<number>;

/** tuple: 元祖, 固定数组长度 */
let t: [string, number];
t = ['hello', 13];

/** enum */
enum Gender {
    male,
    female
}

let u: { name: string, gender: Gender };
u = { name: 'zs', gender: Gender.male };

u.gender === Gender.male;

/** &: 且 */
let y: string & number; //不存在 无意义

let z: { name: string } & { age: number };
z = { name: 'zs', age: 18 }; // 合并对象

/** type */
type myType = 1 | 2 | 3 | 4 | 5;
// let v: 1 | 2 | 3 | 4 | 5;
// let w: 1 | 2 | 3 | 4 | 5;
let v: myType;
v = 1;
// v = 6; // error

/** 类型断言 */
let someValue: unknown = 'this is a string';
let strLength: number = (someValue as string).length
let _strLength: number = (<string>someValue).length

/** 泛型: 在定义函数或者类时, 如果遇到类型不明确就可以用泛型 */
function generic<T>(a: T): T {
    return a;
}
/** 不指定泛型 ,ts会直接对类型进行推断 */
generic(10);
/** 遇到复杂的类型 可以直接指定泛型 */
generic<string>('hello');

/** 指定多个泛型 */
function generic2<T, K>(a: T, b: K): T {
    return a;
}
generic2<string, number>('hello', 1);

/** T extends Inter 表示泛型T必须是Inter的实现类(子类) */
interface Inter {
    length: number
}
function generic3<T extends Inter>(a: T): number {
    return a.length;
}
generic3<string>('123');
generic3({ length: 1 });
// generic3<{ length: number }>({ length: '1' }); // error

/** 在类中使用泛型 */
class MyClass<T>{
    name: T;
    constructor(name: T) {
        this.name = name
    }
}
const mc = new MyClass('hello');
const mc1 = new MyClass<string>('hello');