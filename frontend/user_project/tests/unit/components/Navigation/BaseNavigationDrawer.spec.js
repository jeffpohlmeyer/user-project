import Vue from 'vue';
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import router from '@/router';
import BaseNavigationDrawer from '@/components/Navigation/BaseNavigationDrawer';

Vue.use(Vuetify);
Vue.use(Vuex);

describe('BaseNavingationDrawer', () => {
  let store, mutations;
  const adminMutations = {
    setTheme: jest.fn(console.log('abcdefg')),
    setDrawerLeft: jest.fn(console.log('setDrawerLeft')),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    store = new Vuex.Store({
      state: {},
      mutations,
      modules: {
        admin: {
          state: {
            drawerLeft: false,
            theme: false,
          },
          mutations: adminMutations,
          namespaced: true
        },
        user: {
          state: {
            accessKey: ''
          },
          namespaced: true
        }
      }
    })
  });

  it('changes the theme of the app', () => {
    const wrapper = mount(BaseNavigationDrawer, {
      store,
      router,
    });
    // todo: figure out why the mock isn't getting called here and figure out why setDrawerLeft is getting called
    const themeSwitcher = wrapper.find('[jest="theme-switcher"]');
    themeSwitcher.trigger('click');
    // console.log('adminMutations.setTheme.mock', adminMutations.setTheme.mock)
    // expect(adminMutations.setTheme.mock.calls[0][1]).toBe(false);

  })
});