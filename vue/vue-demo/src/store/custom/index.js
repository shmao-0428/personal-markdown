let Vue;
function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // this.$options.store && (Vue.prototype.$store = this.$options.store);
      if (this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
}

function forEach(obj, callback) {
  Reflect.ownKeys(obj).forEach((key) => {
    callback(key, obj[key]);
  });
}

class Store {
  constructor(options) {
    this.options = options;
    // this.state = options.state;
    this.vm = new Vue({
      data: {
        state: this.options.state,
      },
    });
    this.initGetters();
    this.initMutatios();
    this.initActions();
  }
  get state() {
    return this.vm.state;
  }
  initGetters = () => {
    let getters = this.options.getters;
    this.getters = {};
    forEach(getters, (item, value) => {
      Object.defineProperty(this.getters, item, {
        get: () => {
          return value(this.state);
        },
      });
    });
  };
  initMutatios = () => {
    let mutations = this.options.mutations;
    this.mutations = {};
    forEach(mutations, (mutationName, value) => {
      this.mutations[mutationName] = (payload) => {
        value(this.state, payload);
      };
    });
  };
  initActions = () => {
    let actions = this.options.actions;
    this.actions = {};
    forEach(actions, (actionsName, value) => {
      this.actions[actionsName] = (payload) => {
        value(this, payload);
      };
    });
  };
  // es7写法 this指向永远指向store
  commit = (mutationName, payload) => {
    this.mutations[mutationName](payload);
  };
  dispatch = (actionsName, payload) => {
    this.actions[actionsName](payload);
  };
}
export default { Store, install };
