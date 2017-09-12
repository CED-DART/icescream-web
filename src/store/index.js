import Vue from 'vue'
import Vuex from 'vuex'

import shared from './shared'
import debtor from './debtor'
import shop from './shop'
import user from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    shared,
    debtor,
    shop,
    user
  }
})
