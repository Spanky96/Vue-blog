import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
// 支持IE 浏览器
import 'babel-polyfill';
// 数据存储
import db from './db';
// 路由配置
import router from './router';
// 支持$http
import axios from 'axios';
import filters from './filters';
import VueQriously from 'vue-qriously';

Vue.use(ElementUI);
Vue.use(VueQriously);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.prototype.$db = db;

axios.defaults.withCredentials = true;
for (let key in filters) {
  Vue.filter(key, filters[key]);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
