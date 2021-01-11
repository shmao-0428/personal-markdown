/** all
 * 布尔全等判断 */
const all = (arr, fn = Boolean) => arr.every(fn);
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true

/** castArray
 * 其它类型转数组
 */
const castArray = (val) => (Array.isArray(val) ? val : [val]);
castArray('foo'); // ['foo']
castArray([1]); // [1]
castArray(1); // [1]

/** compact
 * 去除数组中的无效/无用值
 */
const compact = (arr) => arr.filter(Boolean);
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]); // [ 1, 2, 3, 'a', 's', 34 ]

/** countOccurrences
 * 检测数值出现次数
 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

/** dupObjectInArray
 * 数组对象去重
 * @param {array} arr 数组对象
 * @param {string|number|array} key 对象key值
 * 如果是多个参数校验去重 则 key = ['name','code']
 * 不支持深度去重
 *  */

const dupObjectInArray = (arr, key) => {
  if (typeof key !== 'string' && !Array.isArray(key)) {
    throw new TypeError('unvalid key!');
  }
  const map = new Map();
  arr.forEach((item) => {
    /** TODO children for object */
    let k = typeof key === 'string' ? item[key] : key.reduce((prev, cur) => `${item[prev]}${item[cur]}`);
    console.log(k);
    !map.has(k) && map.set(k, item);
  });
  return [...map.values()];
};

let arr = [
  { name: 1, code: 0 },
  { name: 2, code: 1 },
  { name: 3, code: 2 },
  { name: 4, code: 3 },
  { name: 5, code: { a: 1 } },
  { name: 2, code: 4 },
  { name: 5, code: { a: 1, b: 1 } },
];
// console.log(dupObjectInArray(arr, 'name'));
console.log(dupObjectInArray(arr, ['name', 'code']));

/** sampleSize
 * 在指定数组中获取指定长度的随机数
 * 此代码段可用于从数组中获取指定长度的随机数，直至穷尽数组。
 * 使用Fisher-Yates算法对数组中的元素进行随机选择。
 */
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]

/** `shuffle`：“洗牌” 数组
 * 此代码段使用Fisher-Yates算法随机排序数组的元素。
 */
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]

export { all, castArray };
