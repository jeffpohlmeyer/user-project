import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from '@/views/User'
import LoginConfirmed from '@/components/user/LoginConfirmed'
import ForgotPasswordConfirmRedirect from "@/components/user/ForgotPasswordConfirmRedirect"
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import ForgotPassword from '@/components/user/ForgotPassword'
import ForgotPasswordConfirm from "@/components/user/ForgotPasswordConfirm"
import ChangePassword from '@/components/user/ChangePassword'
import Logout from '@/components/user/Logout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        title: `test`
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: 'test'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: `test`
      }
    },
    {
      path: '/password/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        title: `test`
      }
    },
    {
      path: '/password/change',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: {
        title: `test`
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      meta: {
        title: `test`
      }
    },
    {
      path: '/user/confirmed/',
      name: 'LoginConfirmed',
      component: LoginConfirmed,
      meta: {
        title: `test`
      }
    },
    {
      path: '/password/forgot/confirmed',
      name: 'ForgotPasswordConfirm',
      component: ForgotPasswordConfirm,
      meta: {
        title: `test`
      }
    },
    {
      path: '/user/password/confirmed/:uid/:token',
      name: 'ForgotPasswordConfirmRedirect',
      component: ForgotPasswordConfirmRedirect,
      meta: {
        title: `test`
      }
    },
  ]
})
