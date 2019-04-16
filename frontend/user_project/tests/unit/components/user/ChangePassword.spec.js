import Vue from 'vue';
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import Vuetify from 'vuetify';

import ChangePassword from '@/components/user/Password/ChangePassword';

Vue.use(Vuex);
Vue.use(Vuetify);

describe('ChangePassword', () => {
  let store, actions;

  beforeEach(() => {
    actions = {
      changePassword: jest.fn(console.log('abcdefg')),
    };
    console.warn = jest.fn();
    console.error = jest.fn();
    store = new Vuex.Store({
      modules: {
        user: {
          state: {email: 'test@email.com'},
          actions,
        },
      }
    })
  });

  it('mounts properly', () => {
    mount(ChangePassword, {store});
    expect(true).toBe(true);
  });

  it('submits change password properly', async() => {
    // const dispatchSpy = jest.spyOn(store, 'dispatch');
    const wrapper = mount(ChangePassword, {store});
    const old = wrapper.find('[jest="old"]');
    const new1 = wrapper.find('[jest="new1"]');
    const new2 = wrapper.find('[jest="new2"]');
    const button = wrapper.find('[jest="button"]');
    old.element.value = 'old_password';
    new1.element.value = 'new_password';
    new2.element.value = 'new_password';
    button.trigger('click');

    expect(actions.changePassword).toHaveBeenCalled();
    // expect(dispatchSpy).toHaveBeenCalled();
  })
});