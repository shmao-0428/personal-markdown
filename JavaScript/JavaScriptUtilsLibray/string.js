/** `byteSize`：返回字符串的字节长度 */
const byteSize = (str) => new Blob([str]).size;

byteSize('😀'); // 4
byteSize('Hello World'); // 11

/** `size`：获取不同类型变量的长度
 * 这个的实现非常巧妙，利用Blob类文件对象的特性，获取对象的长度。
 */
const size = (val) =>
  Array.isArray(val)
    ? val.length
    : val && typeof val === 'object'
    ? val.size || val.length || Object.keys(val).length
    : typeof val === 'string'
    ? new Blob([val]).size
    : 0;

size([1, 2, 3, 4, 5]); // 5
size('size'); // 4
size({ one: 1, two: 2, three: 3 }); // 3

/** `capitalize`：首字母大写 */
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

capitalize('fooBar'); // 'FooBar'
capitalize('fooBar', true); // 'Foobar'

/**  `capitalizeEveryWord`：每个单词首字母大写 */
const capitalizeEveryWord = (str) => str.replace(/\b[a-z]/g, (char) => char.toUpperCase());

capitalizeEveryWord('hello world!'); // 'Hello World!'

/** `escapeHTML`：转义`HTML`:防XSS攻击 */
const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag] || tag)
  );

escapeHTML('<a href="#">Me & you</a>'); // '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;
