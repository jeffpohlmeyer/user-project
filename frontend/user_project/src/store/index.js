import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import games from './modules/games'
import admin from './modules/admin'

Vue.use(Vuex);

const debug = process.env_NODE_ENV !== 'production';

export const state = {
  snackbar: null,
  message: null,
  color: null,
  snackbarTimeout: null,
};

export const mutations = {
  setSnackbarData(state, payload) {
    const {message, color, snackbar, snackbarTimeout} = {...payload};
    state.message = message;
    state.color = color;
    state.snackbar = snackbar;
    state.snackbarTimeout = !!snackbarTimeout || snackbarTimeout === 0 ? snackbarTimeout : 6000;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    admin,
    user,
    games,
  },
  strict: debug,
  plugins: [createPersistedState({
  })],
  // plugins: debug ? [createLogger()]: [],
})
