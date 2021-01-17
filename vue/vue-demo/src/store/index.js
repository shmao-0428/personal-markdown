import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './custom';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'zs',
    age: 12,
  },
  getters: {
    getName(state) {
      return state.name + '今年' + state.age + '岁';
    },
  },
  mutations: {
    changName(state, payload) {
      state.name = payload;
    },
    changeAge(state, payload) {
      state.age = payload;
    },
  },
  actions: {
    changeAgeByAction({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload);
      }, 300);
    },
  },
});
