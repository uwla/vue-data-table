import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import state from './state'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    actions, state, mutations, modules
})
