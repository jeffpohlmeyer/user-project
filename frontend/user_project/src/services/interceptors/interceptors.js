import { HTTP } from '../http-constants';
import store from '../../store';

export default function createAxiosResponseInterceptor() {
  HTTP.interceptors.request.use(config => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${store.state.user.accessKey}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })
  const interceptor = HTTP.interceptors.response.use(
    response => response,
    error => {
      // Reject promise if usual error
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response
       */
      HTTP.interceptors.response.eject(interceptor);

      return HTTP.post('/simple/token/refresh/', {
        'refresh': `Bearer ${store.state.refreshKey}`
      }).then(response => {
        store.commit('user/setUserKey', {accessKey: response.data.access, refreshKey: response.data.refresh});
        error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access;
        return HTTP(error.response.config);
      }).catch(error => {
        store.commit('user/setUserKey', {accessKey: null, refreshKey: null});
        this.router.push({name: 'Login'});
        return Promise.reject(error);
      }).finally(createAxiosResponseInterceptor);
    }
  );
}