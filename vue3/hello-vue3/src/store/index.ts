import { createStore } from 'vuex'
import userInfo from './modules/user';
export default createStore({
  modules: {
    userInfo
  }
})
