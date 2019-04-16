const state = {
  drawerLeft: false,
  theme: false
};

const getters = {
};

export const mutations = {
  setDrawerLeft(state, payload) {
    state.drawerLeft = payload
  },
  setTheme(state, payload) {
    state.theme = payload
  }
};

export const actions= {
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}