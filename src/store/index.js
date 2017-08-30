import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

import { HTTP } from '../http'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: null,
    users: [],
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
            id: user.IdUser,
            name: user.Name,
            email: user.Email,
            acceptedTems: user.AcceptedTemsDate != null,
            admin: user.IsAdmin
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
      HTTP.post('User/RecoverPassword', {
        email: payload.email
      })
      .then(() => {
        commit('setLoading', false)
        const response = {
          type: 'success',
          message: 'Sua nova senha foi enviada por e-mail!'
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
      localforage.removeItem('icescreamer-user')
      .then(() => {
        commit('setUser', null)
      })
    },
    acceptTerms ({commit}, payload) {
      const user = payload
      user.acceptedTems = true
      localforage.setItem('icescreamer-user', user)
        .then(() => {
          commit('setUser', user)
        })
    },
    clearResponse ({commit}) {
      commit('clearResponse')
    },
    loadUsers ({commit}) {
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
              acceptedTemsDate: obj[key].acceptedTemsDate,
              created: obj[key].created
            })
          }
          commit('setUsers', users)
        })
        .catch((error) => {
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
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
    }
  }
})
