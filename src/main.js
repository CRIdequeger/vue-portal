// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* 引入element-ui */
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/* 引入font-awesome图标库 */
import 'font-awesome/css/font-awesome.min.css';


import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import Mock from './mock';
import * as filters from './filters';

import './assets/css/base.css';


Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(Vuex);

/* 开启Mock.js */
// Mock.bootstrap();

/* 注册过滤器 */
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
