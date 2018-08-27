import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  lines: {},
  stops: []
}

const getters = {
  lines: state => state.lines,
  stops: state => state.stops
}

const mutations = {
  ADD_LINE (state, line) {
    state.lines = line
  },
  ADD_STOPS (state, stops) {
    state.stops = stops
  }
}

const actions = {
  addLine ({commit}, line) {
    commit('ADD_LINE', line)
  },
  addStops ({commit}, stops) {
    commit('ADD_STOPS', stops)
  },
  loadLines (state) {
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('line:DGL')) {
        // console.log(localStorage.key(i))
        // console.log(localStorage.getItem(localStorage.key(i)))
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
