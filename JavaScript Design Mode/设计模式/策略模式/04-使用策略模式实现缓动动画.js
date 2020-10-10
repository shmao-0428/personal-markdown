/*
 * @Author: shmao
 * @Date: 2020-10-06 19:43:04
 * @LastEditors: shmao
 * @LastEditTime: 2020-10-06 23:16:53
 */
// 1. 动画开始时，小球所在的原始位置；
// 2. 小球移动的目标位置；
// 3. 动画开始时的准确时间点；
// 4. 小球运动持续的时间。
// 随后，我们会用 setInterval 创建一个定时器，定时器每隔 19ms 循环一次。在定时器的每一
// 帧里，我们会把动画已消耗的时间、小球原始位置、小球目标位置和动画持续的总时间等信息传
// 入缓动算法。该算法会通过这几个参数，计算出小球当前应该所在的位置。最后再更新该 div 对
// 应的 CSS 属性，小球就能够顺利地运动起来了。
const tween = {
  linear: function (t, b, c, d) {
    return (c * t) / d + b;
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
};
class Animate {
  constructor(dom) {
    this.dom = dom; // 进行运动的 dom 节点
    this.startTime = 0; // 动画开始时间
    this.startPos = 0; // 动画开始时，dom 节点的位置，即 dom 的初始位置
    this.endPos = 0; // 动画结束时，dom 节点的位置，即 dom 的目标位置
    this.propertyName = null; // dom 节点需要被改变的 css 属性名
    this.easing = null; // 缓动算法
    this.duration = null; // 动画持续时间
  }
  /**
   *  propertyName：要改变的 CSS 属性名，比如'left'、'top'，分别表示左右移动和上下移动。
   *  endPos： 小球运动的目标位置。
   *  duration： 动画持续时间。
   *  easing： 缓动算法。
   */
  start(propertyName, endPos, duration, easing) {
    this.startTime = +new Date(); // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[propertyName]; // dom 节点初始位置
    this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
    this.endPos = endPos; // dom 节点目标位置
    this.duration = duration; // 动画持续事件
    this.easing = tween[easing]; // 缓动算法

    let self = this;
    let timeId = setInterval(() => {
      if (self.step() === false) {
        clearInterval(timeId);
      }
    }, 19);
  }

  step() {
    var t = +new Date(); // 取得当前时间
    if (t >= this.startTime + this.duration) {
      // (1)
      this.update(this.endPos); // 更新小球的 CSS 属性值
      return false;
    }
    var pos = this.easing(
      t - this.startTime,
      this.startPos,
      this.endPos - this.startPos,
      this.duration
    );
    // pos 为小球当前位置
    this.update(pos); // 更新小球的 CSS 属性值}
  }

  update(pos) {
    this.dom.style[this.propertyName] = pos + 'px';
  }
}

/**
 * 本节我们学会了怎样编写一个动画类，利用这个动画类和一些缓动算法就可以让小球运动起
 * 来。我们使用策略模式把算法传入动画类中，来达到各种不同的缓动效果，这些算法都可以轻易
 * 地被替换为另外一个算法，这是策略模式的经典运用之一。策略模式的实现并不复杂，关键是如
 * 何从策略模式的实现背后，找到封装变化、委托和多态性这些思想的价值。
 */
