import { Vue } from './store'
const forEachValue = (obj, callback) => {
    Object.keys(obj).forEach((key) => {
        callback(key, obj[key])
    })
}

const installModule = (store, rootState, path, module) => {
    let namespace = store._modules.getNamespace(path);
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((prev, cur) => { return prev[cur] }, rootState);
        Vue.set(parent, path[path.length - 1], module.state)
    }

    module.forEachMutation((key, mutation) => {
        store._mutations[namespace + key] = (store._mutations[namespace + key] || [])
        store._mutations[namespace + key].push((payload) => {
            mutation.call(store, module.state, payload)
        })
    })
    module.forEachAction((key, action) => {
        store._actions[namespace + key] = (store._actions[namespace + key] || []);
        store._actions[namespace + key].push(function (payload) {
            action.call(store, this, payload);
        });
    });
    module.forEachGetter((key, getter) => {
        store._wrappedGetters[namespace + key] = function () {
            return getter(module.state);
        }
    });
    module.forEachChild((key, child) => {
        installModule(store, rootState, path.concat(key), child)
    })
}

function resetStoreVM(store, state) {
    let oldVm = store._vm;
    const computed = {};
    store.getters = {};
    const wrappedGetters = store._wrappedGetters
    forEachValue(wrappedGetters, (key, fn) => {
        computed[key] = () => {
            return fn(store.state);
        }
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        })
    });
    store._vm = new Vue({
        data: {
            state: state,
        },
        computed
    });
    if (oldVm) {
        Vue.nextTick(() => oldVm.$destroy())
    }
}

export { forEachValue, installModule, resetStoreVM }