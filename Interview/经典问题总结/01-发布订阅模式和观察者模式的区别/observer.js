// 观察者
class Observer {
  constructor(val, cb) {
    this.cb = cb;
    this.val = val;
  }
  update(val) {
    if (this.val === val) return;
    this.cb(val);
  }
}
// 观察者列表
class ObserverList {
  constructor() {
    this.observerList = [];
  }
  add(observer) {
    return this.observerList.push(observer);
  }
  remove(observer) {
    this.observerList = this.observerList.filter((ob) => ob !== observer);
  }
  count() {
    return this.observerList.length;
  }
  get(index) {
    return this.observerList[index];
  }
}
// 目标
class Subject {
  constructor() {
    this.observers = new ObserverList();
  }
  addObserver(observer) {
    this.observers.add(observer);
  }
  removeObserver(observer) {
    this.observers.remove(observer);
  }
  notify(...args) {
    let obCount = this.observers.count();
    for (let index = 0; index < obCount; index++) {
      this.observers.get(index).update(...args);
    }
  }
}

const sub = new Subject();
const o1 = new Observer('1', (val) => {
  console.log(val);
});
const o2 = new Observer('2', (val) => {
  console.log(val);
});

sub.addObserver(o1);
sub.addObserver(o2);

// sub.notify('变了');
sub.notify('2');
