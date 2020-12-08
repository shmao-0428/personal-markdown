class Observer {
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(this.name, newState);
  }
}

class Subject {
  constructor(name) {
    this.name = name;
    this.subs = [];
    this.state = '心情美丽';
  }

  setState(state) {
    this.state = state;
    this.subs.forEach((i) => i.update(state));
  }

  attach(observe) {
    this.subs.push(observe);
  }
}
const sub = new Subject('小宝宝');
const o1 = new Observer('爸爸');
const o2 = new Observer('妈妈');

sub.attach(o1);
sub.attach(o2);

sub.setState('心情不好了');
