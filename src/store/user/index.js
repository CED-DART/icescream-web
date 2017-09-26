import localforage from 'localforage'

import { HTTP } from '../../http'

export default {
  state: {
    user: null,
    users: []
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
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
            id: data.idUser,
            name: data.name,
            email: data.email,
            contact: data.contact,
            acceptedTerms: data.acceptedTemsDate !== null,
            acceptedTermsDate: data.acceptedTemsDate,
            birthDate: data.birthDate,
            admissionDate: data.admissionDate,
            imageUrl: data.imageURL,
            admin: data.isAdmin
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
      commit('clearResponse')
      commit('setLoading', true)
      HTTP.post('User/RecoveryPassword', {
        email: payload
      })
      .then(() => {
        commit('setLoading', false)
        const response = {
          type: 'success',
          message: 'Sua nova senha foi enviada para o seu e-mail.'
        }
        commit('setResponse', response)
        commit('setLoading', false)
      })
      .catch((error) => {
        commit('setLoading', false)
        const response = {
          type: 'error',
          message: error.message
        }
        commit('setResponse', response)
        commit('setLoading', false)
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
              imageUrl: obj[key].imageURL,
              active: obj[key].active
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
            contact: user.contact,
            imageUrl: user.imageURL,
            admin: user.isAdmin
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
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        HTTP.put('User/EnableDisable', {
          idUser: payload.id,
          active: payload.active
        })
        .then(() => {
          const response = {
            type: 'success',
            message: `Usuário ${payload.active ? 'desbloqueado' : 'bloqueado'} com sucesso.`
          }
          commit('setResponse', response)
          commit('setLoading', false)
          resolve()
        })
        .catch((error) => {
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
          commit('setLoading', false)
          reject()
        })
      })
    },
    changePasswordUser ({commit}, payload) {
      commit('clearResponse')
      commit('setLoading', true)
      return new Promise((resolve, reject) => {
        HTTP.put('User/ChangePassword', payload)
        .then(() => {
          const response = {
            type: 'success',
            message: 'Senha alterada com sucesso.'
          }
          commit('setResponse', response)
          commit('setLoading', false)
          resolve()
        })
        .catch((error) => {
          const response = {
            type: 'error',
            message: error.message
          }
          commit('setResponse', response)
          commit('setLoading', false)
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
    getUserByToken ({commit}, payload) {
      commit('setLoading', true)
      commit('clearResponse')
      return new Promise((resolve, reject) => {
        HTTP.get('User/RecoveryPasswordToken', {
          params: {
            token: payload
          }
        })
          .then((data) => {
            resolve({
              idUser: data.data.idUser,
              token: data.data.token
            })
            commit('setLoading', false)
          })
          .catch(() => {
            const response = {
              type: 'error',
              message: 'Token de recuperação de senha inválido.'
            }
            commit('setResponse', response)
            commit('setLoading', false)
            reject()
          })
      })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    users (state) {
      return state.users
    }
  }
}
