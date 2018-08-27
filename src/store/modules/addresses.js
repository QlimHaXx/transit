import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  addresses: [{
    name: 'Maison',
    address: '34 rue Bolivar, 69005, Lyon',
    favorite: true
  }, {
    name: 'Travail',
    address: '43, bd du 11 novembre 1918, 69622 Villeurbanne cedex',
    favorite: false
  }, {
    name: 'Nautibus',
    address: '43, bd du 11 novembre 1918, 69622 Villeurbanne cedex',
    favorite: false
  }, {
    name: 'AML',
    address: '43, bd du 11 novembre 1918, 69622 Villeurbanne cedex',
    favorite: false
  }]
}

const getters = {
  addresses: state => state.addresses
}

const mutations = {
  ADD_ADDRESS (state, address) {
    state.addresses.push(address)
  },
  DELETE_ADDRESS (state, address) {
    state.addresses.splice(state.addresses.indexOf(address), 1)
  },
  CHANGE_ADDRESS (state, address) {
    for (var i in state.addresses) {
      state.addresses[i].favorite = false
    }
    var index = state.addresses.indexOf(address)
    state.addresses[index].favorite = true
  }
}

const actions = {
  addAddress ({commit}, address) {
    commit('ADD_ADDRESS', address)
  },
  deleteAddress ({commit}, address) {
    commit('DELETE_ADDRESS', address)
  },
  changeAddress ({commit}, address) {
    commit('CHANGE_ADDRESS', address)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
