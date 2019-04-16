import Vue from 'vue';
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import router from '@/router';
import BaseToolbar from '@/components/Navigation/BaseToolbar';

Vue.use(Vuetify);
Vue.use(Vuex);

describe('BaseToolbar', () => {
  let store, mutations;
  const adminMutations = {
    setDrawerLeft: jest.fn(console.log('hello world'))
  };

  beforeEach(() => {
    console.warn = jest.fn()
    store = new Vuex.Store({
      state: {},
      mutations,
      modules: {
        admin: {
          state: {
            drawerLeft: true
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

  it('changes the state of the navigation drawer when the hamburger icon is clicked', () => {
    // const commitSpy = jest.spyOn(store, 'commit');
    const wrapper = mount(BaseToolbar, {
      store,
      router,
    });
    const hamburgerIcon = wrapper.find('[jest="toolbar-navigation-drawer-button"]');
    hamburgerIcon.trigger('click');
    expect(adminMutations.setDrawerLeft.mock.calls[0][1]).toBe(false);
    hamburgerIcon.trigger('click');
    hamburgerIcon.trigger('click');

    expect(adminMutations.setDrawerLeft).toHaveBeenCalledTimes(3);
    expect(console.warn).toHaveBeenCalled();
  });

  it('tests login functionality if the accessKey is unavailable', () => {
    const wrapper = mount(BaseToolbar, {
      store,
      router,
    });
    const accountButton = wrapper.find('[jest="login-navigation-button"]')
    accountButton.trigger('click');
    expect(wrapper.vm.$route.name).toEqual('Login');
    expect(console.warn).toHaveBeenCalled();
  });

  it('tests user and logout functionality if the accessKey is available', () => {
    let state = store.state;
    state.user.accessKey = 'abc';
    store.replaceState(state);
    const wrapper = mount(BaseToolbar, {
      store,
      router,
    })
    const userButton = wrapper.find('[jest="user-navigation-button"]')
    userButton.trigger('click');
    expect(wrapper.vm.$route.name).toEqual('User');
    const logoutButton = wrapper.find('[jest="logout-navigation-button"]')
    logoutButton.trigger('click');
    expect(wrapper.vm.$route.name).toEqual('Logout');
    expect(console.warn).toHaveBeenCalled();
  })
});