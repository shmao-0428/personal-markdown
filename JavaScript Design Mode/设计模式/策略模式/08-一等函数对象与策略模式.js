/*
 * @Author: shmao
 * @Date: 2020-10-06 19:44:41
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-07 00:10:02
 */

// 本章提供的几个策略模式示例，既有模拟传统面向对象语言的版本，也有针对 JavaScript 语
// 言的特有实现。在以类为中心的传统面向对象语言中，不同的算法或者行为被封装在各个策略类
// 中，Context 将请求委托给这些策略对象，这些策略对象会根据请求返回不同的执行结果，这样
// 便能表现出对象的多态性。
// Peter Norvig 在他的演讲中曾说过：“在函数作为一等对象的语言中，策略模式是隐形的。
// strategy 就是值为函数的变量。”在 JavaScript 中，除了使用类来封装算法和行为之外，使用函数
// 当然也是一种选择。这些“算法”可以被封装到函数中并且四处传递，也就是我们常说的“高阶
// 函数”。实际上在 JavaScript 这种将函数作为一等对象的语言里，策略模式已经融入到了语言本身
// 当中，我们经常用高阶函数来封装不同的行为，并且把它传递到另一个函数中。当我们对这些函
// 数发出“调用”的消息时，不同的函数会返回不同的执行结果。在 JavaScript 中，“函数对象的多
// 态性”来得更加简单。
// 在前面的学习中，为了清楚地表示这是一个策略模式，我们特意使用了 strategies 这个名字。
// 如果去掉 strategies，我们还能认出这是一个策略模式的实现吗？代码如下：
var S = function (salary) {
  return salary * 4;
};
var A = function (salary) {
  return salary * 3;
};
var B = function (salary) {
  return salary * 2;
};
var calculateBonus = function (func, salary) {
  return func(salary);
};
calculateBonus(S, 10000); // 输出：40000
