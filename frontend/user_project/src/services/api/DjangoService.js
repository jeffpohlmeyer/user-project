import {HTTP} from '../http-constants'

export default {
  login(payload) {
    console.log('payload', payload)
    return new Promise((resolve, reject) => {
      console.log('payload in login', payload)
      HTTP({method: 'post',
        url: `/simple/token/`,
        data: {
          username: payload.username,
          password: payload.password
        }})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  register(payload) {
    return new Promise((resolve, reject) => {
      HTTP
        .post('/rest-auth/registration/', {
          email: payload.email,
          password1: payload.password1,
          password2: payload.password2,
          username: payload.username
        })
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  getAllUsers() {
    HTTP
      .get('/api/users/',{})
      .then(response => { console.log(response) })
      .catch(err => { console.log(err.response.data) })
  },
  getUser() {
    return new Promise((resolve, reject) => {
      HTTP
        .get(`/rest-auth/user/`,{})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  updateUserInfo(payload) {
    return new Promise((resolve, reject) => {
      HTTP
        .put(`/rest-auth/user/`,
          {
            first_name: payload.firstName,
            last_name: payload.lastName,
            username: payload.username
          },
          {})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  resetPassword(payload) {
    return new Promise((resolve, reject) => {
      HTTP
        .post(`/rest-auth/password/reset/`,
          {
            email: payload.email
          },
          {})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  confirmPasswordReset(payload) {
    return new Promise((resolve, reject) => {
      HTTP
        .post(`/rest-auth/password/reset/confirm/`,
          {
            uid: payload.uid,
            token: payload.token,
            new_password1: payload.new_password1,
            new_password2: payload.new_password2,
          },
          {})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  changePassword(payload) {
    return new Promise((resolve, reject) => {
      HTTP
        .post(`/rest-auth/password/change/`,
          {
            old_password: payload.old_password,
            new_password1: payload.new_password1,
            new_password2: payload.new_password2,
          },
          {})
        .then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
    })
  },
  logout() {
    return new Promise((resolve, reject) => {
      HTTP
        .post(`/rest-auth/logout/`,{},{})
        .then(response => {
          resolve(response)
        },error => {
          reject(error)
        })
    })
  },
  getNewAccessKey(payload) {
    HTTP
      .post(`/simple/token/refresh/`, {refresh: payload.refreshKey})
      .then(response => (Promise.resolve(response)))
      .catch(err => (Promise.reject(err)))
  }
}