function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
let person = {
  name: 'father',
  arr: [1, 2, 3],
};
function fn(origin) {
  let clone = object(origin);
  clone.name = 'a';
  clone.arr.push(4);
  clone.getall = function () {
    console.log('hi');
  };
  return clone;
}
let a = fn(person); // Object.create()

console.log(person); // { name: 'father', arr: [ 1, 2, 3, 4 ] }
a.getall();
