import Vue from 'vue'
import Vuex from 'vuex'
import addresses from './modules/addresses'
import places from './modules/places'
import journeys from './modules/journeys'
import lines from './modules/lines'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    addresses,
    places,
    journeys,
    lines
  }
})
