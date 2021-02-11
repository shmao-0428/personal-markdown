import { Store, install } from '../../../../Vuex/lib/index'
import Vue from 'vue';
Vue.use(install);
export default new Store({
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