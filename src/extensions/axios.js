import axios from 'axios';
import router from '../router';
import store from '../store';

axios.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem('token');
    console.log(token)
    if (token !== null && token) {
      req.headers['Authorization'] = `Bearer ${token}`;
      console.log('interceptors config=', req);
    }
    return req;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  (res) => {
    if (res.data.token) {
      console.log('token:', res.data.token);
      window.localStorage.setItem('token', res.data.token);
    }
    return res;
  },
  (error) => {
    if (typeof error === 'string') {
      return Promise.reject(error);
    } else if (error.response.status === 401) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
      console.log('身份认证失败, 请重新登录');
      store.commit('setUser', null);
      router.push('/login');
    }
    return Promise.reject(error.message);
  });

export default axios;
