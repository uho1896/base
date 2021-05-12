import Vue from 'vue'
import Vuex from 'vuex'

import bag from './bag'
import progress from './progress'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bag,
    progress,
  },
})