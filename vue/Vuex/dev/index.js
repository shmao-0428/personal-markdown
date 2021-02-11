const applyMixin = function (Vue) {
    Vue.mixin({
        beforeCreate: vuexInit
    });
};
function vuexInit() {
    const options = this.$options;
    if (options.store) {
        this.$store = options.store;
    }
    else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
    }
}

const forEachValue = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(key, obj[key]);
    });
};
const installModule = (store, rootState, path, module) => {
    let namespace = store._modules.getNamespace(path);
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((prev, cur) => { return prev[cur]; }, rootState);
        Vue.set(parent, path[path.length - 1], module.state);
    }
    module.forEachMutation((key, mutation) => {
        store._mutations[namespace + key] = (store._mutations[namespace + key] || []);
        store._mutations[namespace + key].push((payload) => {
            mutation.call(store, module.state, payload);
        });
    });
    module.forEachAction((key, action) => {
        store._actions[namespace + key] = (store._actions[namespace + key] || []);
        store._actions[namespace + key].push(function (payload) {
            action.call(store, this, payload);
        });
    });
    module.forEachGetter((key, getter) => {
        store._wrappedGetters[namespace + key] = function () {
            return getter(module.state);
        };
    });
    module.forEachChild((key, child) => {
        installModule(store, rootState, path.concat(key), child);
    });
};
function resetStoreVM(store, state) {
    let oldVm = store._vm;
    const computed = {};
    store.getters = {};
    const wrappedGetters = store._wrappedGetters;
    forEachValue(wrappedGetters, (key, fn) => {
        computed[key] = () => {
            return fn(store.state);
        };
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        });
    });
    store._vm = new Vue({
        data: {
            state: state,
        },
        computed
    });
    if (oldVm) {
        Vue.nextTick(() => oldVm.$destroy());
    }
}

class Module {
    constructor(rawModule) {
        this._children = {};
        this._rawModule = rawModule;
        this.state = rawModule.state;
    }
    get namespaced() {
        return !!this._rawModule.namespaced;
    }
    getChild(key) {
        return this._children[key];
    }
    addChild(key, module) {
        this._children[key] = module;
    }
    forEachMutation(fn) {
        if (this._rawModule.mutations) {
            forEachValue(this._rawModule.mutations, fn);
        }
    }
    forEachAction(fn) {
        if (this._rawModule.actions) {
            forEachValue(this._rawModule.actions, fn);
        }
    }
    forEachGetter(fn) {
        if (this._rawModule.getters) {
            forEachValue(this._rawModule.getters, fn);
        }
    }
    forEachChild(fn) {
        forEachValue(this._children, fn);
    }
}

class ModuleCollection {
    constructor(options) {
        this.register([], options);
    }
    register(path, rootModule) {
        // let newModule = {
        //     _raw: rootModule,
        //     _children: {},
        //     state: rootModule.state,
        // }
        let newModule = new Module(rootModule);
        if (path.length === 0) {
            this.root = newModule;
        }
        else {
            let parent = path.slice(0, -1).reduce((prev, cur) => {
                return prev._children[cur];
            }, this.root);
            parent._children[path[path.length - 1]] = newModule;
        }
        if (rootModule.modules) {
            forEachValue(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module);
            });
        }
    }
    getNamespace(path) {
        let module = this.root;
        return path.reduce((namespace, key) => {
            module = module.getChild(key);
            return namespace + (module.namespaced ? key + '/' : '');
        }, '');
    }
}

let Vue;
const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue);
};
class Store {
    constructor(options) {
        // initGerrters(options) {
        //     this.getters = {};
        //     let getters = options.getters;
        //     forEachValue(getters, (name, cb) => {
        //         Object.defineProperty(this.getters, name, {
        //             get: () => {
        //                 return cb(this.state)
        //             }
        //         })
        //     })
        // }
        // initMutation = (options) => {
        //     let mutations = options.mutations;
        //     this.mutations = {};
        //     forEachValue(mutations, (name, cb) => {
        //         this.mutations[name] = cb;
        //     })
        // }
        // commit = (name, payload) => {
        //     this.mutations[name](this.state, payload)
        // }
        // initActions = (options) => {
        //     let actions = options.actions;
        //     this.actions = {};
        //     forEachValue(actions, (name, cb) => {
        //         this.actions[name] = cb;
        //     })
        // }
        // dispatch = (name, payload) => {
        //     this.actions[name](this, payload)
        // }
        this.commit = (type, payload) => {
            this._mutations[type].forEach(fn => fn.call(this, payload));
        };
        this.dispatch = (type, payload) => {
            this._actions[type].forEach(fn => fn.call(this, payload));
        };
        let state = options.state;
        this._vm = new Vue({
            data: {
                state: state
            }
        });
        this._modules = new ModuleCollection(options);
        console.log(options);
        console.log(this._modules);
        this._wrappedGetters = {};
        this._mutations = {};
        this._actions = {};
        installModule(this, state, [], this._modules.root);
        resetStoreVM(this, state);
        // this.initGerrters(options)
        // this.initMutation(options)
        // this.initActions(options)
    }
    get state() {
        return this._vm.state;
    }
}

var index = {
    Store,
    install
};

export default index;
export { Store, install };
//# sourceMappingURL=index.js.map
