import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  journeys: null
}

const getters = {
  journeys: state => state.journeys
}

const mutations = {
  ADD_JOURNEY (state, journey) {
    state.journeys = journey
  },
  DELETE_JOURNEY (state, journey) {
    state.journeys = null
  }
}

const actions = {
  addJourney ({commit}, journey) {
    commit('ADD_JOURNEY', journey)
  },
  deleteJourney ({commit}, journey) {
    commit('DELETE_JOURNEY', journey)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
