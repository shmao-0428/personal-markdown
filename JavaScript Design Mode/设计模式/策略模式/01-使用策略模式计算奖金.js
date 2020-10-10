/*
 * @Author: shmao
 * @Date: 2020-10-06 19:42:05
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 22:13:49
 */
// 策略模式有着广泛的应用。本节我们就以年终奖的计算为例进行介绍。
// 很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为 S 的人年
// 终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，而绩效为 B 的人年终奖是 2 倍工资。假设财
// 务部要求我们提供一段代码，来方便他们计算员工的年终奖。

(function () {
  // 在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算
  // 法的实现是各异和变化的，每种绩效对应着不同的计算规则。
  // 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体
  // 的算法，并负责具体的计算过程。第二个部分是环境类 Context，Context 接受客户的请求，随后
  // 把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用。
  // 现在用策略模式来重构上面的代码。第一个版本是模仿传统面向对象语言中的实现。我们先
  // 把每种绩效的计算规则都封装在对应的策略类里面：

  // 策略类
  class performanceLevelS {
    calculateBonus(salary) {
      return salary * 4;
    }
  }
  class performanceLevelA {
    calculateBonus(salary) {
      return salary * 3;
    }
  }
  class performanceLevelB {
    calculateBonus(salary) {
      return salary * 2;
    }
  }

  // 环境类
  class Bonus {
    constructor(salary, strategy) {
      this.salary = null;
      this.strategy = null; // 绩效等级对应的策略对象
    }
    setSalary(salay) {
      return (this.salary = salay);
    }
    setStrategy(strategy) {
      return (this.strategy = strategy);
    }
    getBonus() {
      return this.strategy.calculateBonus(this.salary);
    }
  }

  const bonus = new Bonus();
  bonus.setSalary(1000);

  bonus.setStrategy(new performanceLevelA());

  console.log(bonus.getBonus());
})();
