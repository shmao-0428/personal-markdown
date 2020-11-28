# vue 中如何检测数组的变化

## 核心答案:

由于性能原因, 没有用 defineProperty 对数组的每一项进行拦截,而是选择重写了数组方法(push,shift,unshift,pop,sort,reverse,splice)(这些方法都可以改变原数组).

## 补充:

在 vue 中修改数组的索引和长度是无法监控的.需要通过以上 7 中编译方法才会触发数组对应的 watcher 进行更新.数组中如果是对象数据类型也会进行递归劫持

> 可以通过 Vue.$set()方法进行数据处理 - > 核心是 splice 方法

> 源码位置: src/core/observer/arrya.js:8

> 响应式数据源码位置: src/core/observer/index.js:135
