let Vue;
import applyMixin from './mixin'
import { Vm, Data } from './type'
import { installModule, resetStoreVM } from './util'
import ModuleCollection from './moduleCollection'

const install = (_Vue) => {
    Vue = _Vue;
    applyMixin(Vue);
}

class Store {
    private _vm: Vm
    private options: Data
    // getters: Data
    mutations: Data
    actions: Data
    _wrappedGetters: Data
    _mutations: Data
    _actions: Data
    _modules: Data
    constructor(options) {
        let state = options.state;

        this._vm = new Vue({
            data: {
                state: state
            }
        })

        this._modules = new ModuleCollection(options);
        console.log(options);
        console.log(this._modules);


        this._wrappedGetters = {};
        this._mutations = {};
        this._actions = {};

        installModule(this, state, [], this._modules.root)

        resetStoreVM(this, state)

        // this.initGerrters(options)
        // this.initMutation(options)
        // this.initActions(options)
    }

    get state() {
        return this._vm.state
    }

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

    commit = (type, payload) => {
        this._mutations[type].forEach(fn => fn.call(this, payload));
    }
    dispatch = (type, payload) => {
        this._actions[type].forEach(fn => fn.call(this, payload));
    }
}

export { Store, install, Vue }
