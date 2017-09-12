import { HTTP } from '../../http'

export default {
  state: {
    debtors: []
  },
  mutations: {
    setDebtors (state, payload) {
      state.debtors = payload
    }
  },
  actions: {
    loadUserDebtors ({commit}, payload) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.get('UserDebtor/GetPending', {
        params: {
          maximumItems: payload === undefined ? null : payload
        }
      })
        .then((data) => {
          const debtors = []
          const obj = data.data
          for (let key in obj) {
            debtors.push({
              id: obj[key].idUserDebtor,
              name: obj[key].userName,
              contact: obj[key].userContact,
              date: obj[key].debitDate,
              reason: obj[key].reason
            })
          }
          commit('setDebtors', debtors)
          commit('setLoading', false)
        })
        .catch((error) => {
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    debtors (state) {
      return state.debtors
    }
  }
}
