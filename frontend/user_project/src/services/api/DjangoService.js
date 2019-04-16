import {HTTP} from '../http-constants'
import axios from 'axios';

const apiCall = process.env.NODE_ENV === 'test' ? axios : HTTP;

export default {
  async login(payload) {
    try {
      const {username, password} = {...payload};
      const response = await apiCall.post(`/simple/token/`, {username,password});
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/login', err);
      return Promise.reject(err);
    }
  },
  async register(payload) {
    try {
      const {email, password1, password2, username} = {...payload};
      const response = await apiCall
        .post('/rest-auth/registration/', {
          email,
          password1,
          password2,
          username
        });
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/register', err);
      return Promise.reject(err);
    }
  },
  async getAllUsers() {
    try {
      const response = await apiCall.get('/api/users/');
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/getAllUsers', err);
      return Promise.reject(err);
    }
  },
  async getUser() {
    try {
      const response = await apiCall.get(`/rest-auth/user/`);
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/getUser', err);
      return Promise.reject(err);
    }
  },
  async updateUserInfo(payload) {
    try {
      const response = await apiCall
        .put(`/rest-auth/user/`,
          {
            first_name: payload.firstName,
            last_name: payload.lastName,
            username: payload.username
          });
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/updateUserInfo', err);
      return Promise.reject(err);
    }
  },
  async resetPassword(payload) {
    try {
      const response = await apiCall
        .post(`/rest-auth/password/reset/`,{email: payload.email});
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/resetPassword', err);
      return Promise.reject(err);
    }
  },
  async confirmPasswordReset(payload) {
    try {
      const response = await apiCall
        .post(`/rest-auth/password/reset/confirm/`,
          {
            uid: payload.uid,
            token: payload.token,
            new_password1: payload.new_password1,
            new_password2: payload.new_password2,
          });
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/confirmPasswordReset', err);
      return Promise.reject(err);
    }
  },
  async changePassword(payload) {
    try {
      const response = await apiCall
      .post(`/rest-auth/password/change/`,
        {
          old_password: payload.old_password,
          new_password1: payload.new_password1,
          new_password2: payload.new_password2,
        });
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/changePassword', err);
      return Promise.reject(err);
    }
  },
  async logout() {
    try {
      const response = await apiCall.post(`/rest-auth/logout/`,{},{});
      return Promise.resolve(response);
    } catch(err) {
      console.log('err in DjangoService/logout', err);
      return Promise.reject(err);
    }
  },
}