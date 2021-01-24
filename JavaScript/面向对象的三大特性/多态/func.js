/** 多态的具体表现为方法重载和方法重写：多态是指通过指向父类的引用，来调用在不同子类中实现的方法
 * 方法重载：重载是指不同的函数使用相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数; js没有重载
 * 方法重写：重写（也叫覆盖）是指在派生类中重新对基类中的虚函数（注意是虚函数）重新实现。即函数名和参数都一样，只是函数的实现体不一样 */
class Father {
  constructor(name) {
    this._name = name;
  }
  //实例方法，通过实例对象调用
  getName() {
    console.log(this._name);
  }
  work() {
    console.log(this._name + '的工作是累死累活，赚钱养家');
  }
  // 静态方法不会被继承,并且是通过类名去调用的
  static hitXiaoMing() {
    console.log('打小明');
  }
}

class Son extends Father {
  constructor(name, age) {
    //实例化子类的时候把子类的数据传给父类（这里的super必须有，super里的参数是所继承的父类实例化所需要的数据）
    super(name);
    this._age = age;
  }
  work() {
    console.log(this._name + '的工作是好好学习，天天向上。');
  }
}

var DaMing = new Father('大明');
DaMing.work(); // 我的工作是累死累活，赚钱养家。
var XiaoMing = new Son('小明', 15);
XiaoMing.work(); // 我的工作是好好学习，天天向上。
