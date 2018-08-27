import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  departure: null,
  arrival: null
}

const getters = {
  departure: state => state.departure,
  arrival: state => state.arrival
}

const mutations = {
  DEPARTURE (state, place) {
    state.departure = place
  },
  ARRIVAL (state, place) {
    state.arrival = place
  }
}

const actions = {
  departure ({commit}, place) {
    commit('DEPARTURE', place)
  },
  arrival ({commit}, place) {
    commit('ARRIVAL', place)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
