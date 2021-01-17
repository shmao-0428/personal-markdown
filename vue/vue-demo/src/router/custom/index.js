/** 自定义路由方法 */
let Vue;
class VueRouter {
  static install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
      beforeCreate() {
        // console.log(this.$options);
        // console.log('自定义router');
        // 启动理由
        this.$options.router && this.$options.router.init();
      }
    });
  }
  constructor(options) {
    this.$options = options;
    this.mode = options.mode || "hash";
    this.to = "";
    this.from = this.getHash();
    this.fn = () => {};
    // console.log(options);
    // 路由映射表
    this.routeMap = {};
    // 使用vue的响应式机制
    this.app = new Vue({
      data: {
        // 默认根目录
        currentComponent: "/"
      }
    });
  }
  init() {
    // 1. 监听hashchang事件
    this.bindEvents();
    // 2. 处理路由表
    this.createRouteMap();
    // 3. 处理组件 router-view router-link
    this.initComponent();
  }
  bindEvents() {
    // window.addEventListener('load', this.onHashChange.bind(this), false);
    if (this.mode === "history") {
      window.addEventListener(
        "DOMContentLoaded",
        this.onPopStateChange.bind(this),
        false
      );
      window.addEventListener(
        "popstate",
        this.onPopStateChange.bind(this),
        false
      );
    } else {
      window.addEventListener(
        "DOMContentLoaded",
        this.onHashChange.bind(this),
        false
      );
      window.addEventListener(
        "hashchange",
        this.onHashChange.bind(this),
        false
      );
    }
  }
  onPopStateChange(e) {
    this.app.currentComponent = location.pathname;
  }
  onHashChange(e) {
    // console.log(e);
    if (e.newURL || e.oldURL) {
      this.to = e.newURL.split("#")[1];
      this.from = e.oldURL.split("#")[1];
    }
    let hash = this.getHash();
    this.beforeEach(this.fn);
    this.app.currentComponent = hash;
  }
  getHash() {
    return window.location.hash.slice(1);
  }
  createRouteMap() {
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });
  }
  initComponent() {
    let mode = this.mode;
    let that = this;
    Vue.component("router-view", {
      render: h => {
        let component,
          current = that.app.currentComponent || "/",
          map = that.routeMap;
        if (map[current].redirect) {
          component = map[map[current].redirect].component;
        } else {
          component = map[current].component;
        }
        return h(component);
      }
    });

    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h(
          "a",
          {
            attrs: {
              href: `#${this.to}`
            },
            on: {
              click: e => {
                if (mode === "history") {
                  e.preventDefault();
                  history.pushState(null, "", this.to);
                  that.onPopStateChange();
                }
              }
            }
          },
          [this.$slots.default]
        );
      }
    });
  }
  beforeEach(fn) {
    this.fn = this.fn ? fn : fn;
    this.fn(this.to, this.from, value => {
      if (typeof value === "string") {
        this.app.currentComponent = value;
      }
      if (typeof value === "object") {
        this.app.currentComponent = value.path;
      }
      this.app.currentComponent = this.getHash();
    });
  }
}

export default VueRouter;
