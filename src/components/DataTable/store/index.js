import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import state from './state'

export default new Vuex.Store({
    getters, mutations, state
})
