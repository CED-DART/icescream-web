import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

import { HTTP } from '../http'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    users: [],
    shops: [],
    debtors: [],
    loading: false,
    response: {
      type: null,
      message: null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
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
    },
    setUsers (state, payload) {
      state.users = payload
    },
    setShops (state, payload) {
      state.shops = payload
    },
    setDebtors (state, payload) {
      state.debtors = payload
    }
  },
  actions: {
    logUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.post('User/Login', {
        email: payload.email,
        password: payload.password
      })
      .then((user) => {
        commit('setLoading', false)
        const data = user.data
        if (data) {
          const newUser = {
            id: data.idUser,
            name: data.name,
            email: data.email,
            contact: data.contact,
            acceptedTerms: data.acceptedTemsDate !== null,
            acceptedTermsDate: data.acceptedTemsDate,
            birthDate: data.birthDate,
            admissionDate: data.admissionDate,
            admin: false
          }
          localforage.setItem('iceScreamerUser', newUser)
            .then(() => {
              commit('setUser', newUser)
            })
        } else {
          const response = {
            type: 'error',
            message: 'Usuário ou senha inválido.'
          }
          commit('setResponse', response)
        }
      })
      .catch((error) => {
        commit('setLoading', false)
        const response = {
          type: 'error',
          message: error.message
        }
        commit('setResponse', response)
      })
    },
    recoveryUserPassword ({commit}, payload) {
      HTTP.post('User/RecoveryPassword', {
        email: payload.email
      })
      .then(() => {
        commit('setLoading', false)
        const response = {
          type: 'success',
          message: 'Sua nova senha foi enviada para o seu e-mail.'
        }
        commit('setResponse', response)
      })
      .catch((error) => {
        commit('setLoading', false)
        const response = {
          type: 'error',
          message: error.message
        }
        commit('setResponse', response)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
    },
    logout ({commit}) {
      localforage.removeItem('iceScreamerUser')
      .then(() => {
        commit('setUser', null)
      })
    },
    acceptTerms ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('clearResponse')
        HTTP.post('User/AcceptedTerms', {
          idUser: payload.id
        })
        .then(() => {
          commit('setLoading', false)
          const user = payload
          user.acceptedTerms = true
          user.acceptedTermsDate = new Date()
          localforage.setItem('iceScreamerUser', user)
            .then(() => {
              commit('setUser', user)
              resolve()
            })
        })
        .catch(() => {
          commit('setLoading', false)
          const response = {
            type: 'error',
            message: 'Falha ao assinar termo de aceite.'
          }
          commit('setResponse', response)
          reject()
        })
      })
    },
    clearResponse ({commit}) {
      commit('clearResponse')
    },
    loadUsers ({commit}) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.get('User/GetAll')
        .then((data) => {
          const users = []
          const obj = data.data
          for (let key in obj) {
            users.push({
              id: obj[key].idUser,
              name: obj[key].name,
              email: obj[key].email,
              birthDate: obj[key].birthDate,
              admissionDate: obj[key].admissionDate,
              actived: obj[key].disabled !== undefined ? obj[key].disabled : true
            })
          }
          commit('setUsers', users)
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
    userDetail ({commit}, payload) {
      commit('setLoading', true)
      commit('clearResponse')
      HTTP.get('User/Get', {
        params: {
          id: payload.id
        }
      })
        .then((data) => {
          const users = []
          const user = data.data
          users.push({
            id: user.idUser,
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            admissionDate: user.admissionDate,
            created: user.created,
            contact: user.contact
          })
          commit('setUsers', users)
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
    updateUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        HTTP.put('User/Update', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Usuário alterado com sucesso.'
          }
          commit('setResponse', response)
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
    enableDisableUser ({commit}, payload) {
      HTTP.put('User/EnableDisable', {
        idUser: payload.id,
        active: payload.active
      })
      .then(() => {
        const response = {
          type: 'success',
          message: `Usuário ${payload.actived ? 'desbloqueado' : 'bloqueado'} com sucesso.`
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
    changePasswordUser ({commit}, payload) {
      return new Promise((resolve, reject) => {
        HTTP.put('User/ChangePassword', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Senha alterada com sucesso.'
          }
          commit('setResponse', response)
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
    createUser ({commit}, payload) {
      commit('setLoading', true)
      HTTP.post('User/Add', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Usuário cadastrado com sucesso.'
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
    },
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
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    response (state) {
      return state.response
    },
    users (state) {
      return state.users
    },
    shops (state) {
      return state.shops
    },
    debtors (state) {
      return state.debtors
    }
  }
})
