# 面向过程

我们知道，面向过程 的时候，我们的关注点是 步骤
面向过程做事，就是把 一件事情 分割为多个步骤， 然后依次去完成每一个步骤
这样做事可以让我们的事情变的很明朗，不会弄乱
那么，

既然有了面向过程，为什么还要跑出来一个面向对象呢？
面向对象是什么东西呢？有啥好处？
他和面向过程有啥关系呢？ 他们两个我们应该选谁呢？

# 面向对象概述

所谓面向对象，
意思就是，我们的关注点 是对象， 而非过程（步骤）
那么，这里的对象是啥意思呢？
要回答这个问题， 就必须先回到实际的案例中去讲解
上节课的我们的案例是制作一个玩具鸭子，我们的关注点是制作鸭子的每一个步骤
如果我们只是捏个泥娃娃，或者制作一个简单的玩具鸭子， 使用面向过程，是没有多大问题的
但是如果我们面对的一个复杂的事情呢？
有一家玩具公司，这家玩具公司不止生成玩具鸭，还生产玩具狗，玩具猫，玩具猫头鹰， 。。。。。 等等 100 多种玩具
如果按照之前的 面向过程思路，那么我们的代码 会很长， 很杂乱， 那 怎么办呢？
这时候就需要使用面向对象的思路来解决问题了

# 面向对象-封装

于是某一天，，这家玩具公司有了一台鸭子制造机器，
这台机器，当我们按下开关后，它就会立刻开始制作玩具鸭子，
此刻，我们不再去关注先做脚，还是先做头， 还是身体，
这台机器会帮我们搞定所有步骤， 我们只需要在机器的出口处，等着完整的玩具鸭子出来就可以了
这时候，我们的关注点，就是这台机器本身，而不是制作鸭子的某一个步骤
这台机器，此刻就是一个对象（整体），此刻，我们就开始了面向对象
可能到这里大家还是不明白，还是有点糊涂，这是正常的， 请允许我再来解释解释
这台鸭子制造机器，包含了 以前制造鸭子的所有步骤，它把制作鸭子的步骤，封装在了机器内部， 留给我们的，只有一个开关，我们只需要按开关，就可以开始制造鸭子
而以前的面向过程，我们需要关注制造鸭子的细节，需要先制作鸭头，然后制作翅膀，然后....
但是，当我们有了一台封装了详细步骤的机器，只需要关心什么时候按开关，别的都不用关心
这就是面向对象的第一个特性（好处）： 封装
**封装特性，可以把复杂的信息，流程，包起来，内部处理，**
让使用者不去关注细节， 只关心什么时候按开关，
如此一来当我们要制作鸭子的时候，只要按开关就可以了，是不是省心很多？？

## 再来举个例子

比如，某一天，你以程序员的身份，去某家公司工作，老板让你开发一个网站，
此刻，老板就是面向了对象，这里的对象，在老板眼里 就是你， 因为老板只要把任务丢给你，他不关注你用什么电脑写代码，也不关注你用什么输入法，不会关注你写代码的时候听什么歌，不会关注你写代码的时候是穿拖鞋好，还是光脚丫好， 更加不会关注你今天穿什么颜色的内裤 写代码效率更高；
但是在你自己的角度，你就是面向过程的，你会关心自己用哪个电脑写代码更舒服， 你会关注自己用哪个输入法效率更高，你还会关注写代码应该听什么歌.. 等等
而，当你写代码的时候，你使用的电脑，对于你而言，也是一个封装好的对象， 当你在键盘上按下字母 A， 你不会关注电脑内部究竟发生了 多么复杂的化学反应， 你只关注，我按了键盘上的字母 A，电脑就要显示一个 A 在屏幕上
同样的道理，我们用的手机，也是一个封装的很好的对象，我们想打电话给某人，输入对方的号码， 点击拨号就可以接通对方， 我们不会关注按下每个数字以后，手机内部发生的复杂原理，更加不会关注手机是怎么连接基站的，也不会关注手机内部是怎么与基站进行信号交换的， 我们的关注点就是， 我要打电话给 张三，要和他说说话，其他复杂的事情手机会帮我搞定
再举例， 我们玩的手机游戏、电脑游戏，也算是一个对象，在游戏里，当我们按下技能发射按钮，我希望能发射一个技能出去， 我不关注按下按钮后，手机是怎么检测到我的手指的，也不会关注，手机是怎么把技能光环显示在屏幕上的，更加不会关注，敌人死了以后，手机究竟给服务器发送了什么信息， 我只关心， 当我按了按钮，就发射技能，当敌人死了，他就倒下并且无法再攻击我
你现在明白了吗， 程序员、工程师，把复杂的东西封装起来，留给我们的，只是非常简单的操作按钮， 可以让我们做事情 更加高效，更加快乐
而那家玩具公司，有 100 多种玩具，原本需要关注几千个生产步骤，如今，有了面向对象，只要把每个玩具的制作流程封装成机器，然后只关注 100 个机器的按钮就可以了，
如果这家公司的老板还想再简化，那就雇佣 100 个员工来负责这 100 台机器的运行， 然后给这 100 个员工雇佣 1 个主管
而老板自己，则只需要面对主管一个人就行了，你看，经过层层封装，最后多简单啊
对象 可以是我们生活中任何的 人、事、物
而几乎所有对象都具有了封装的特性，你能想到什么对象没有封装的特性吗？
以上，这就是面向对象的第一个特性， 封装



# 参考链接

1. [Python中什么是面向对象-封装](https://juejin.cn/post/6844903829310275592)