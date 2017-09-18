import { HTTP } from '../../http'

export default {
  state: {
    debtors: [],
    lastPaymentDate: null
  },
  mutations: {
    setDebtors (state, payload) {
      state.debtors = payload
    },
    setLastPaymentDate (state, payload) {
      state.lastPaymentDate = payload
    },
    confirmPayment (state, payload) {
      const debtors = state.debtors
      debtors.splice(debtors.findIndex(debtor => debtor.id === payload.id), 1)
      state.debtors = debtors
    }
  },
  actions: {
    loadUserDebtors ({commit}, payload) {
      commit('setLoading', true)
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
              imageUrl: obj[key].imageURL,
              contact: obj[key].userContact,
              date: obj[key].debitDate,
              reason: obj[key].reason
            })
          }
          commit('setDebtors', debtors)
          commit('clearResponse')
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('clearResponse')
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
          commit('setLoading', false)
        })
    },
    createPendingDebtors ({commit}) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.post('UserDebtor/CreatePendingDebtors')
        .then(() => {
          commit('loadUserDebtors')
          const response = {
            type: 'success',
            message: 'Devedores de sorvete atualizados com sucesso.'
          }
          commit('setResponse', response)
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
    },
    getLastPaymentDate ({commit}) {
      commit('clearResponse')
      return new Promise((resolve, reject) => {
        HTTP.get('UserDebtor/GetLastPaymentDate')
        .then((data) => {
          const lastPaymentDate = data.data
          commit('setLastPaymentDate', lastPaymentDate)
          resolve()
        })
        .catch((error) => {
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
          reject()
        })
      })
    },
    confirmPayment ({commit}, payload) {
      commit('clearResponse')
      commit('setLoading', true)
      // TODO: Call API to confirm payment and on .then() commit 'confirmPayment'
      commit('confirmPayment', payload)
      commit('setLoading', false)
    }
  },
  getters: {
    debtors (state) {
      return state.debtors
    },
    lastPaymentDate (state) {
      return state.lastPaymentDate
    }
  }
}
