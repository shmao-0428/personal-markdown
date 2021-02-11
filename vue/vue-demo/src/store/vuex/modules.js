import { Store, install } from '../../../../Vuex/dev/index'
import Vue from 'vue';
Vue.use(install);
export default new Store({
    modules: {
        a: {
            namespaced: 'a',
            modules: {
                b: {
                    namespaced: 'b',
                    modules: {
                        d: {
                            namespaced: 'd',
                            state: {
                                age: 19
                            },
                            mutations: {
                                changeAge (state, payload) {
                                    state.age = payload;
                                }
                            }
                        },
                    },
                    state: {
                        name: 'b'
                    },
                    mutations: {
                        changeName (state, payload) {
                            state.name = payload
                        }
                    }
                },
                c: {
                    state: {
                        name: 'c'
                    },
                    mutations: {
                        changeName (state, payload) {
                            state.name = payload
                        }
                    }
                },
            },
            state: {
                name: 'a'
            },
            getters: {
                getName (state) {
                    return state.name + '>>>';
                }
            },
            mutations: {
                changeAge (state, payload) {
                    state.age += payload
                },
                changName (state, payload) {
                    state.name = payload;
                },
            },
            actions: {
                changeAgeByAction ({ commit }, payload) {
                    setTimeout(() => {
                        commit('changeAge', payload);
                    }, 1000);
                }
            },
        },
    },
    namespaced: 'root',
    state: {
        age: 25,
        name: 'shmao'
    },
    getters: {
        getAge (state) {
            return state.age + 10;
        }
    },
    mutations: {
        changeAge (state, payload) {
            state.age += payload
        },
        changName (state, payload) {
            state.name = payload;
        },
    },
    actions: {
        changeAgeByAction ({ commit }, payload) {
            setTimeout(() => {
                commit('changeAge', payload);
            }, 1000);
        }
    }
})
// console.log(Store, install);