import { HTTP } from '../../http'

export default {
  state: {
    shops: []
  },
  mutations: {
    setShops (state, payload) {
      state.shops = payload
    }
  },
  actions: {
    loadIceCreamShops ({commit}) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.get('IceCreamShop')
        .then((data) => {
          const shops = []
          const obj = data.data
          for (let key in obj) {
            shops.push({
              id: obj[key].idIceCreamShop,
              name: obj[key].name,
              address: obj[key].address,
              phone: obj[key].phone,
              averagePrice: obj[key].averagePrice,
              paymentMethods: obj[key].paymentMethods
            })
          }
          commit('setShops', shops)
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
    updateIceCreamShop ({commit}, payload) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.put('IceCreamShop/Update', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Sorveteria alterada com sucesso.'
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
    createIceCreamShop ({commit}, payload) {
      commit('setLoading', true)
      HTTP.post('IceCreamShop', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Sorveteria cadastrada com sucesso.'
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
    }
  },
  getters: {
    shops (state) {
      return state.shops
    }
  }
}
