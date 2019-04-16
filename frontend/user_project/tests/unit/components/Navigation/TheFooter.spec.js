import Vue from 'vue';
import { shallowMount } from "@vue/test-utils";
import Vuetify from 'vuetify';
import TheFooter from '@/components/Navigation/TheFooter';

Vue.use(Vuetify);

describe('TheFooter', () => {
  it('should mount properly', () => {
    const wrapper = shallowMount(TheFooter);
    expect(true).toBe(true);
  })
});