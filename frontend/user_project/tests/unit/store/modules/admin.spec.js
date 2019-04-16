import Vue from 'vue';
import Vuex from 'vuex';
import { mutations } from '@/store/modules/admin'

Vue.use(Vuex);

const {
  setDrawerLeft,
  setTheme
} = mutations;

describe('mutations', () => {
  describe('setDrawerLeft', () => {
    it('toggles visibility of the left navigation drawer', () => {
      const state = {
        drawerLeft: false,
      };
      setDrawerLeft(state, true);
      expect(state).toEqual({drawerLeft: true});
      setDrawerLeft(state, false);
      expect(state).toEqual({drawerLeft: false});
    })
  });

  describe('setTheme', () => {
    it('toggles the dark or light theme of the site', () => {
      const state = {
        theme: false,
      };
      setTheme(state, true);
      expect(state).toEqual({theme: true});
      setTheme(state, false);
      expect(state).toEqual({theme: false});
    })
  })
})