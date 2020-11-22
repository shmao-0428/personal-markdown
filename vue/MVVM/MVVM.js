/*
 * @Author: shmao
 * @Date: 2020-11-20 09:01:53
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-22 18:01:58
 */

//订阅
class Dep {
  constructor() {
    // 存放所有的watcher
    this.subs = [];
  }
  // 订阅
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 发布
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}
// 观察者
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 默认先存放旧值
    this.oldVal = this.get();
  }
  get() {
    // 先把自己放到this上
    Dep.target = this;
    // 取值 把观察者和数据关联起来
    let value = CompileUtil.getValue(this.vm, this.expr);
    Dep.target = null; // 不取消 任何值都会添加watcher
    return value;
  }
  // 更新操作 数据变化后 会调用贯彻着的update方法
  update() {
    let newVal = CompileUtil.getValue(this.vm, this.expr);
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
}

class Observer {
  constructor(data) {
    this.observer(data);
  }
  observer(data) {
    if (data && typeof data === 'object') {
      // 对象
      for (const key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    // 递归绑定响应式
    this.observer(value);
    // 给每个属性具有发布订阅的功能
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 创建watcher时 会获取到对应的内容 并且把watcher放到全局
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newVal) => {
        if (newVal === value) return;

        this.observer(newVal);
        value = newVal;

        dep.notify();
      },
    });
  }
}

//模板编译
class Compiler {
  constructor(el, vm) {
    // 判断el是不是一个元素 如果不是元素就获取
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    // console.log(this.el);

    this.vm = vm;

    // 把当前节点元素获取到 放到内存中
    let fragment = this.node2fragment(this.el);
    // console.log(fragment);

    // 把节点中的内容替换

    // 编译模板 用数据编译
    this.compile(fragment);

    // 把内容赛道页面中
    this.el.appendChild(fragment);
  }
  isDirective(attrName) {
    return attrName.startsWith('v-');
  }
  //编译元素
  compileElement(node) {
    let attributes = node.attributes;
    // console.log(attributes);
    [...attributes].forEach((attr) => {
      //   console.log(attr);
      let { name, value: expr } = attr;
      // 判断是否是指令
      if (this.isDirective(name)) {
        //v-model
        // console.log(name);
        let [, direcitve] = name.split('-'); // v-on:click
        let [directiveName, eventName] = direcitve.split(':');
        // 需要调用不同的指令
        CompileUtil[directiveName](node, expr, this.vm, eventName);
      }
    });
  }
  // 编译文本
  compileText(node) {
    let content = node.textContent;
    //   console.log(content);
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtil['text'](node, content, this.vm);
      //   console.log(content);
    }
  }
  // 用来编译内存中的dom节点
  compile(node) {
    let childNodes = node.childNodes;
    // console.log(childNodes);
    [...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // console.log('element', child);
        this.compileElement(child);
        // 如果是元素 需要把自己穿进去 再次遍历
        this.compile(child);
      } else {
        // console.log('text', child);
        this.compileText(child);
      }
    });
  }
  node2fragment(node) {
    //创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = node.firstChild)) {
      // fragment具有移动性
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  // 是否元素
  isElementNode(node) {
    return node.nodeType === 1;
  }
}

CompileUtil = {
  // 根据表达式 获取对应的数据
  getValue(vm, expr) {
    //vm.$data school.name
    return expr.split('.').reduce((data, current) => {
      return data[current];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    expr.split('.').reduce((data, current, index, arr) => {
      if (arr.length - 1 === index) {
        data[current] = value;
      }
      return data[current];
    }, vm.$data);
  },
  // 解析一个v-model指令
  model(node, expr, vm) {
    // 给输入框赋予value属性 node.value = xxx
    let fn = this.updater['modelUpdater'];
    // 添加观察者
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal);
    });

    node.addEventListener('input', (e) => {
      let value = e.target.value;
      this.setValue(vm, expr, value);
    });

    let value = this.getValue(vm, expr);
    fn(node, value);
  },
  html(node, expr, vm) {
    // v-html="message"
    // node.innerHtml = value
    let fn = this.updater['htmlUpdater'];
    // 添加观察者
    new Watcher(vm, expr, (newVal) => {
      fn(node, newVal);
    });

    let value = this.getValue(vm, expr);
    fn(node, value);
  },
  getContentValue(vm, expr) {
    // 遍历表达式, 将内容 重新 替换成一个完整的内容 返还回去
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1].trim());
    });
  },
  text(node, expr, vm) {
    // expr => {{a}} {{b}}
    let fn = this.updater['textUpdater'];
    let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // 给表达式每个人都加上观察者
      new Watcher(vm, args[1].trim(), () => {
        fn(node, this.getContentValue(vm, expr));
      });

      return this.getValue(vm, args[1].trim());
    });
    fn(node, content);
  },
  on(node, expr, vm, eventName) {
    node.addEventListener(eventName, (e) => {
      vm[expr] && vm[expr].call(vm, e);
    });
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    htmlUpdater(node, value) {
      //xss
      node.innerHTML = value;
    },
    textUpdater(node, value) {
      node.textContent = value;
    },
  },
};

// 基类
class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;

    let computed = options.computed;
    let methods = options.methods;

    // 这个根元素 编译模板
    if (this.$el) {
      // 把数据添加响应式
      new Observer(this.$data);

      //   console.log(this.$data);

      this.proxyComputed(computed);
      this.proxyMethods(methods);
      // 数据代理
      this.proxyVm(this.$data);

      new Compiler(this.$el, this);
    }
  }
  proxyVm(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          data[key] = newValue;
        },
      });
    }
  }
  proxyComputed(computed) {
    for (const key in computed) {
      Object.defineProperty(this.$data, key, {
        get: () => {
          return computed[key].call(this);
        },
      });
    }
  }
  proxyMethods(methods) {
    for (const key in methods) {
      Object.defineProperty(this, key, {
        get() {
          return methods[key];
        },
      });
    }
  }
  $set(obj, key, value) {
    new Observer().defineReactive(obj, key, value);
  }
}
