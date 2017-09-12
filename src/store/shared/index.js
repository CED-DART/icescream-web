export default {
  state: {
    loading: false,
    response: {
      type: null,
      message: null
    }
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setResponse (state, payload) {
      state.response = payload
    },
    clearResponse (state, payload) {
      state.response = {
        type: null,
        message: null
      }
    }
  },
  actions: {
    clearResponse ({commit}) {
      commit('clearResponse')
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    response (state) {
      return state.response
    }
  }
}
