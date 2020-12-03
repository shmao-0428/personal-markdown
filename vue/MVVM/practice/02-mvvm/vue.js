"use strict";

class Vue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;

    if (this.$el) {
      new Observer(this.$data);

      // 代理data
      this.proxyData(this.$data);
      // 编译
      new Compiler(this.$el, this);
    }
  }
  proxyData(data) {
      for (const key in data) {
          Object.defineProperty(this, key, {
              get() {
                  return data[key];
              },
              set(newValue){
                  data[key] = newValue;
              }
          })
      }
  }
}

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    const fragment = this.setFragment(this.el); // 缓存文档碎片

    this.compile(fragment); // 解析编译

    this.el.appendChild(fragment);
  }

  // 是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }

  setFragment(node) {
    // 创建一个文档碎片
    let fragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  // 解析
  compile(node, vm) {
    const childNodes = node.childNodes;
    [...childNodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // console.log('%c element:', 'color:red;font-weight:700;', child);
        this.elementCompile(child);
        this.compile(child);
      } else {
        this.textCompile(child);
        // console.log('%c text:', 'color:blue;font-weight:700;', child);
      }
    });
  }

  elementCompile(node) {
    const attributes = node.attributes;
    [...attributes].forEach((attr) => {
      const { name, value: expr } = attr;
      if (this.isDirective(name)) {
        const [, directive] = name.split("-");

        CompileUtils[directive](node, expr, this.vm);
      }
    });
  }

  textCompile(node) {
    // console.log(typeof node);
    const content = node.textContent;
    // console.log('%c content:', 'color:red;font-weight:700;', typeof content);
    if (/\{\{(.+?)\}\}/.test(content)) {
      CompileUtils["text"](node, content, this.vm);
    }
  }

  isDirective(directive) {
    return directive.startsWith("v-");
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(watcher) {
    this.subs.push(watcher);
  }
  notify() {
    this.subs.forEach((watcher) => {
      watcher.update();
    });
  }
}

class Watcher {
  constructor(expr, vm, callback) {
    this.expr = expr;
    this.vm = vm;
    this.callback = callback;
    this.oldValue = this.getOldValue(expr, vm);
  }
  getOldValue() {
    Dep.target = this;
    const value = CompileUtils.getValue(this.expr, this.vm);
    Dep.target = null;
    return value;
  }
  update() {
    const newValue = CompileUtils.getValue(this.expr, this.vm);
    newValue !== this.oldValue && this.callback(newValue);
  }
}

class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === "object") {
      for (const key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value) {
    this.observe(value);

    let dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newValue) => {
        if (newValue === value) return;

        // 如果重写的属性为对象
        this.observe(newValue);

        value = newValue;

        // 更新
        dep.notify();
      },
    });
  }
}

const CompileUtils = {
  getValue(expr, vm) {
    return expr.split(".").reduce((data, cur) => {
      return data[cur];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    expr.split(".").reduce((data, cur, index, arr) => {
      if (index === arr.length - 1) {
        return (data[cur] = value);
      }
      return data[cur];
    }, vm.$data);
  },
  model(node, expr, vm) {
    const fn = this.update["modelUpdate"];
    const value = this.getValue(expr, vm);

    new Watcher(expr, vm, (newValue) => {
      fn(node, newValue);
    });

    node.addEventListener("input", (e) => {
      // 更新vue中的值
      this.setValue(vm, expr, e.target.value);
    });

    fn(node, value);
  },
  text(node, expr, vm) {
    const fn = this.update["textUpdate"];
    const content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      let _expr = args[1].trim();
      new Watcher(_expr, vm, () => {
        fn(node, this.getLatestContentValue(expr, vm));
      });
      return this.getValue(_expr, vm);
    });
    fn(node, content);
  },

  getLatestContentValue(expr, vm) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(args[1].trim(), vm);
    });
  },

  update: {
    modelUpdate(node, value) {
      node.value = value;
    },
    textUpdate(node, value) {
      node.textContent = value;
    },
  },
};
