// 有一天大冰块声明了一个对象
let obj = {
  a: 1,
  b: 2,
};

// 过了很久，同事小明用到了这个对象，不过因为对象里键值对繁多，并没有仔细筛查，小明给对象添加了新的键值对
obj.a = 100;

// 此时obj的值为
obj = {
  a: 100,
};

// 如果其他地方在用obj.a的值，就会出现一系列的错误

// 所以小明给obj对象添加属性时，可以写成

const a = Symbol('a');
obj[a] = 100;

// 此时obj的值为
console.log(obj); // {a: 100, Symbol(a): 100}

/** 魔术字符串 */
let getUserInfo = (state) => {
  if (state == 'yes') {
    // 状态正确的后续操作
  } else if (state == 'no') {
    // 状态错误的后续操作
  } else {
    // 其他状态的后续操作
  }
};

// 在上述代码中，getUserInfo函数的传参"yes"和"no"都是魔术字符串，它们在多个接口中都被用到，不利于将来的修改和维护。
// Symbol适用于原先写成魔术字符串的地方，因为它能保证自己是全局唯一的值。

// 所以代码可改写如下
let status = {
  success: Symbol('success'),
  error: Symbol('error'),
};
getUserInfo = (state) => {
  if (state === status.success) {
    // 状态正确的后续操作
  } else if (state === status.error) {
    // 状态错误的后续操作
  } else {
    // 其他状态的后续操作
  }
};

getUserInfo(status.success);
