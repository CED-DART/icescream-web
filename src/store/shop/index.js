import { HTTP } from '../../http'

export default {
  state: {
    shops: []
  },
  mutations: {
    setShops (state, payload) {
      state.shops = payload
    },
    updateIceCreamShop (state, payload) {
      const shop = state.shops.find(shop => {
        return shop.id === payload.idIceCreamShop
      })
      if (payload.name) {
        shop.name = payload.name
      }
      if (payload.address) {
        shop.address = payload.address
      }
      if (payload.phone) {
        shop.phone = payload.phone
      }
      if (payload.averagePrice) {
        shop.averagePrice = payload.averagePrice
      }
      if (payload.paymentMethods) {
        shop.paymentMethods = payload.paymentMethods
      }
    },
    deleteIceCreamShop (state, payload) {
      const shops = state.shops
      shops.splice(shops.findIndex(shop => shop.id === payload), 1)
      // Reflect.deleteProperty(state.user.fbKeys, payload)
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
          commit('updateIceCreamShop', payload)
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
      HTTP.post('IceCreamShop/Add', payload)
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
    },
    deleteIceCreamShop ({commit}, payload) {
      commit('setLoading', true)
      HTTP.delete('IceCreamShop', {
        params: {
          id: payload
        }
      })
        .then(() => {
          const response = {
            type: 'success',
            message: 'Sorveteria excluída com sucesso.'
          }
          commit('setResponse', response)
          commit('setLoading', false)
          commit('deleteIceCreamShop', payload)
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
