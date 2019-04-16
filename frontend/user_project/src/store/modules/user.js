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
    alertMessage: null,
    uid: '',
    token: '',
  }
}

const getters = {};

export const mutations = {
  setUserKey(state, payload) {
    state.accessKey = payload.accessKey;
    state.refreshKey = payload.refreshKey;
    state.expiration = Date.now() + 300000
  },
  setSnackbar(state, payload) {
    state.alertMessage = payload.message;
    state.color = payload.color;
  },
  setAlertMessage(state, payload) {
    state.alertMessage = payload;
  },
  setPasswordResetData(state, payload) {
    state.uid = payload.uid;
    state.token = payload.token;
  },
  setUserInfo(state, payload) {
    state.email = payload.email;
    state.firstName = payload.first_name;
    state.lastName = payload.last_name;
    state.username = payload.username;
    state.id = payload.id;
  },
  setFirstName(state, payload) {
    state.firstName = payload;
  },
  setLastName(state, payload) {
    state.lastName = payload;
  },
  setUsername(state, payload) {
    state.userName = payload;
  },
  reset(state) {
    const s = initialState();
    Object.keys(s).forEach(key => {
      state[key] = s[key];
    });
    console.log('state', state)
  }
};

export const actions = {
  async loginUser({ commit }, payload) {
    try {
      const response = await DjangoAPI.login(payload);
      commit('setUserKey',{
        accessKey: response.data.access,
        refreshKey: response.data.refresh
      });
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in user.actions/loginUser', err)
      return Promise.reject(err);
    }
  },
  async registerUser({ commit }, payload) {
    try {
      const response = await DjangoAPI.register(payload);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/registerUser', err);
      return Promise.reject(err);
    }
  },
  getAllUsers() {
    DjangoAPI.getAllUsers()
  },
  async getUser({ commit }, payload) {
    try{
      const response = await DjangoAPI.getUser(payload);
      commit('setUserInfo', response.data)
    }
    catch(err) {
      console.log(err.response)
    }
  },
  async updateUserInfo({ commit }, payload) {
    try {
      const response = await DjangoAPI.updateUserInfo(payload);
      commit('setUserInfo', response.data);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/updateUserInfo', err);
      return Promise.reject(err);
    }
  },
  async resetPassword({}, payload) {
    try {
      const response = await DjangoAPI.resetPassword(payload);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/resetPassword', err);
      return Promise.reject(err);
    }
  },
  async confirmPasswordReset({}, payload) {
    try {
      const response = await DjangoAPI.confirmPasswordReset(payload);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/confirmPasswordReset', err);
      return Promise.reject(err);
    }
  },
  async changePassword({}, payload) {
    try {
      const response = await DjangoAPI.changePassword(payload);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/changePassword', err);
      return Promise.reject(err);
    }
  },
  async logout({ commit }) {
    try {
      const response = await DjangoAPI.logout();
      commit('setUserKey',{accessKey: null, refreshKey: null});
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in store.user/logout', err);
      return Promise.reject(err);
    }
  }
};

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}