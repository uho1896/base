import Vue from 'vue'

const state = {
  routeParams: {},
  ticket: null,
}

const mutations = {
  putIn(s, data) {
    Vue.set(s, 'routeParams', data);
  },
  setTicket(s, data) {
    Vue.set(s, 'ticket', data);
  },
}

const actions= {
  putIn({commit}, data) {
    commit('putIn', data);
  },
  setTicket({commit}, data) {
    commit('setTicket', data);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}