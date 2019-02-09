import DjangoAPI from '@/services/api/DjangoService'
import { HTTP } from '@/services/http-constants'

function initialState() {
  return {
    accessKey: null,
    refreshKey: null,
    expiration: 0,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    path: '',
    alertMessage: '',
    uid: '',
    token: '',
  }
}

const getters = {}

export const actions = {
  loginUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.login(payload)
        .then(response => {
          commit('setUserKey',{
            accessKey: response.data.access,
            refreshKey: response.data.refresh
          })
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.register(payload)
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getAllUsers() {
    DjangoAPI.getAllUsers()
  },
  getUser({ commit, dispatch }, payload) {
    DjangoAPI.getUser(payload)
      .then(response => {
        commit('setUserInfo', response.data)
      })
      .catch(err => {
        console.log(err.response)
      })
  },
  updateUserInfo({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.updateUserInfo(payload)
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  resetPassword({}, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.resetPassword(payload)
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  confirmPasswordReset({}, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.confirmPasswordReset(payload)
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  changePassword({}, payload) {
    return new Promise((resolve, reject) => {
      DjangoAPI.changePassword(payload)
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      DjangoAPI.logout()
        .then(response => {
          commit('setUserKey',{accessKey: null, refreshKey: null})
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  }
}

export const mutations = {
  setUserKey(state, payload) {
    state.accessKey = payload.accessKey
    state.refreshKey = payload.refreshKey
    console.log('HTTP', HTTP)
    // HTTP.config.headers['Authorization'] = `Bearer  ${payload.accessKey}`;
    state.expiration = Date.now() + 300000
  },
  setSnackbar(state, payload) {
    state.alertMessage = payload.message
    state.color = payload.color
  },
  setConfirmedMessage(state) {
    state.alertMessage = 'You have confirmed your email address.  Please log in.'
  },
  setPasswordResetMessage(state) {
    state.alertMessage = 'You have successfully reset your password.  Please log in.'
  },
  setPasswordResetData(state, payload) {
    state.uid = payload.uid
    state.token = payload.token
  },
  setUserInfo(state, payload) {
    state.email = payload.email
    state.firstName = payload.first_name
    state.lastName = payload.last_name
    state.username = payload.username
    state.id = payload.id
  },
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
    console.log('state', state)
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}