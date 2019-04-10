import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
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
import utils from './utils/CommonUtil';
import VueQriously from 'vue-qriously';

Vue.use(ElementUI);
Vue.use(VueQriously);
Vue.config.productionTip = false;
Vue.prototype.$db = db;

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;

Vue.prototype.$util = utils;

for (let key in filters) {
  Vue.filter(key, filters[key]);
}

router.beforeEach((to, from, next) => {
  if (to.fullPath == '/') {
    var loginUser = db.get('loginUser');
    if (loginUser) {
      router.push({name: 'Index', params: {id: loginUser.id}});
    } else {
      router.push({name: 'Login'});
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
