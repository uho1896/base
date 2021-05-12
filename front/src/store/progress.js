import Vue from 'vue'

const state = {
  progress: 0,
  show: false,
}

const mutations = {
  setProgress(s, p) {
    Vue.set(s, 'progress', p);
  },
  setShow(s, show) {
    Vue.set(s, 'show', show);
  },
}

const actions = {
  resetProgress({commit}) {
    commit('setProgress', 0);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}