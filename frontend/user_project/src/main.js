import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import 'babel-polyfill'

Vue.use(Vuetify)

Vue.config.productionTip = false

import dotenv from 'dotenv'

dotenv.config()

import createAxiosResponseInterceptor from '@/services/interceptors/interceptors'

createAxiosResponseInterceptor();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
