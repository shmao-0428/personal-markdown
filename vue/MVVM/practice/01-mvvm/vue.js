/*
 * @Author: shmao
 * @Date: 2020-11-23 16:59:15
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-24 15:28:02
 */

// 订阅者
class Dep {
  constructor() {
    this.subs = []; // 观察者
  }
  addSub(watcher) {
    this.subs.push(watcher) // 添加观察者
  }
  notify() {
    // 发布
    this.subs.forEach(watcher=>{
      watcher.update()
    })
  }
}

// 观察者
class Watcher {
  constructor(vm, expr, cb) {
    // console.log(vm, expr, cb);
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    // 获取旧值
    this.oldValue = this.cacheOldValue();
  }
  cacheOldValue() {
    // 将watcher绑定到订阅者上
    Dep.target = this;
    // 由于js是单线程的 所以当我们获取属性值的时候会走defineReactive方法, 此时我们将需要观察的属性添加观察者
    const value = CompileUtils.getValue(this.expr, this.vm); 
    Dep.target = null;
    return value;
  }
  update(){
    const newValue = CompileUtils.getValue(this.expr, this.vm);
    if(newValue !== this.oldValue) {
      this.cb(newValue);
    }
  }
}

// 响应式
class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    // console.log("%c data:", "color:red;font-weight:700;", data);
    if (data && typeof data === "object") {
      // console.log(data);
      for (const key in data) {
        this.defineReactive(data, key, data[key]);
      }
    }
  }
  defineReactive(obj, key, value){
    // 递归绑定响应式
    this.observe(value);

    let dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 添加订阅者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set:(newValue)=>{
        if(newValue === value) return;

        this.observe(newValue); // 如果重写的属性为对象 添加响应式
        value = newValue;

        dep.notify(); // 更新视图
      }
    })
  }
}
// 编译类
class Compiler {
  constructor(el, vm) {
    this.vm = vm;

    // 判断是否是节点还是字符串
    this.el = this.isElementOrNode(el) ? el : document.querySelector(el);

    // 获取节点
    this.fragment = this.node2fragment(this.el);
    // console.log(this.fragment);
    // 解析文档碎片
    this.compile(this.fragment);

    // 将编译后的文档碎片添加到app中
    this.el.appendChild(this.fragment);
  }
  compile(node) {
    let childNodes = node.childNodes;
    // console.log(childNodes);
    // 判断是文本类型 还是元素类型
    [...childNodes].forEach((child) => {
      // console.log(child);
      // 元素类型
      if (this.isElementOrNode(child)) {
        // console.log('element>>>',child);
        this.compileElement(child);

        // 如果元素内部是文本
        this.compile(child);
      } else {
        // console.log('text>>>',child);
        this.compileText(child);
      }
    });
  }
  compileElement(node) {
    let attributes = node.attributes;
    // console.log(attributes);
    [...attributes].forEach((attr) => {
      // console.dir(attr);
      const { name, value: expr } = attr;
      // 判断是否是指令
      if (this.isDirective(name)) {
        // console.log(name, expr);
        const [, directive] = name.split("-");
        const [directiveName, eventName] = directive.split(':');
        // 找到指令对应的方法
        CompileUtils[directiveName](node, expr, this.vm, eventName);
      }
    });
  }
  compileText(node) {
    //   console.dir(node);
    let content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      // console.log('%c content:', 'color:red;font-weight:700;', content);
      CompileUtils["text"](node, content, this.vm);
    }
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  node2fragment(node) {
    // 获取文档碎片
    let fragment = document.createDocumentFragment();
    // console.log(fragment);
    let firstChild;
    while ((firstChild = node.firstChild)) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }
  isElementOrNode(node) {
    return node.nodeType === 1;
  }
}

// 编译方法
CompileUtils = {
  getValue(expr, vm) {
    return expr.split(".").reduce((data, cur) => {
      return data[cur];
    }, vm.$data);
  },
  setValue(vm, expr, value) {
    // console.log(vm, expr, value);
    expr.split('.').reduce((data, cur, index, arr)=>{
      if(index === arr.length-1){
        data[cur] = value;
      }
      return data[cur];
    },vm.$data)
  },
  // v-model
  model(node, expr, vm) {
    // console.log(node, expr, vm);
    const fn = this.updater["modelUpdate"];
    
    // 添加观察者
    new Watcher(vm, expr, (newValue) => {
      fn(node, newValue)
    })

    node.addEventListener('input', (e) => {
      // console.log(e.target.value);
      // fn(node, e.target.value)
      this.setValue(vm, expr, e.target.value);
    })
    
    // 获取vm中对应的值
    const value = this.getValue(expr, vm);

    // 赋值
    fn(node, value);
  },
  html(node, expr, vm) {
    const fn = this.updater["htmlUpdate"];
    
    // 添加观察者
    new Watcher(vm, expr, (newValue) => {
      fn(node, newValue)
    })

    // 获取vm中对应的值
    const value = this.getValue(expr, vm);

    // 赋值
    fn(node, value);
  },
  text(node, expr, vm) {
    // console.log(node, expr, vm);
    const fn = this.updater["textUpdate"];
    const value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      // console.log(args[1].trim());
      new Watcher(vm, args[1].trim(), ()=>{
        // fn(node, newValue); // 如果一个元素中有两个响应式文本 只更新其中一个的数据 节点中的内容会被覆盖 所以需要重新遍历获取
        fn(node, this.getContentValue(vm, expr))
      })

      return this.getValue(args[1].trim(), vm);
    });

    fn(node, value);
  },
  getContentValue(vm, expr) {
    return expr.replace(/\{\{(.+?)\}\}/g, (...args)=>{
      return this.getValue(args[1].trim(), vm);
    })
  },
  on(node, expr, vm, eventName) {
    // console.log(node, expr, vm, eventName);
    node.addEventListener(eventName, (e)=>{
      vm[expr] && vm[expr].call(vm, e);
    })
  },
  updater: {
    modelUpdate(node, value) {
      node.value = value;
    },
    textUpdate(node, value) {
      node.textContent = value;
    },
    htmlUpdate(node, value) {
      node.innerHTML = value;
    }
  },
};

class Vue {
  constructor(options) {
    this.$data = options.data;
    this.$el = options.el;

    this.computed = options.computed;
    this.methods = options.methods;

    if (this.$el) {
      // 添加响应式
      new Observer(this.$data);

      // 添加computed
      this.proxyComputed(this.computed);

      // 添加methods
      this.proxyMethods(this.methods);

      // 代理响应式数据
      this.proxyVm(this.$data);

      // 编译模板
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
        }
      })
    }
  }
  proxyComputed(computed) {
    for (const key in computed) {
      Object.defineProperty(this.$data, key, {
        get:() => {
          return computed[key].call(this)
        }
      })
    }
  }
  proxyMethods(methods) {
    for (const key in methods) {
      Object.defineProperty(this, key, {
        get() {
          return methods[key];
        }
      })
    }
  }
}
