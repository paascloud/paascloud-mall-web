// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import routes from './router';
import VueRouter from 'vue-router';
import axios from 'axios';
import Vuex from 'vuex';
import store from './store/';
import VueLazyload from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'font-awesome/css/font-awesome.css';
import Mixin from './mixins';
import {enums, PcCookie, PcLockr, PcEncrypt} from 'util/';
import Bus from 'src/vueBus';
import filters from './filters';

import {
  Input,
  Dialog,
  Button,
  Form,
  formItem,
  MessageBox,
  Message
} from 'element-ui';

const components = [
  Input,
  Dialog,
  Button,
  Form,
  formItem
];

components.map(component => {
  Vue.component(component.name, component);
});

Vue.prototype.$pcMessageBox = MessageBox;
Vue.prototype.$pcMessage = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.mixin(Mixin);
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-spinning-bubbles.svg',
  try: 3 // default 1
});

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes
});

Vue.prototype.$http = axios.create({
  timeout: 60000
});

Vue.prototype.$pcBus = Bus;
Vue.prototype.$pcEnum = enums;
Vue.prototype.$pcNProgress = NProgress;
Vue.prototype.$pcEncrypt = PcEncrypt;

if (process.env.NODE_ENV === 'production') {
  Vue.prototype.$http.defaults.baseURL = 'http://api.paascloud.net/';
}

function mergeCartFlag() {
  let authToken = store.getters.getAuthToken;
  console.info('mall-authToken: ', authToken);
  if (authToken && authToken.access_token && !authToken.mergeCartFlag) {
    // 合并购物车数据
    let cartListDto = {};
    cartListDto.cartProductVoList = PcLockr.get(enums.CART.SHOPPING_CART) ? JSON.parse(PcLockr.get(enums.CART.SHOPPING_CART)) : [];
    axios({
      method: 'post',
      url: '/uac/cart/mergeUserCart',
      data: cartListDto
    })
      .then((res) => {
        console.log(res);
        authToken.mergeCartFlag = true;
        store.dispatch('update_user_info', authToken.loginName);
        store.dispatch('set_cart_list', res.result.cartProductVoList);
        store.dispatch('update_auth_token', authToken);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

Vue.prototype.$http.interceptors.request.use((config) => {
  if (!config.url.indexOf('/auth') >= 0) {
    store.dispatch('get_access_token', (res) => {
      if (res) {
        config.headers.Authorization = 'Bearer ' + res;
      }
    });
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

Vue.prototype.$http.interceptors.response.use((res) => {
  if (res.data.code === 200) {
    if (res.data) {
      return res.data;
    }
  }
  if (res.data.code === 10031001) {
    return res.data;
  }
  if (res.data.code === 10011039 || res.data.code === 10011040 || res.data.code === 10011041) {
    // 验证token失败 || 解析header失败 || 页面已过期,请重新登录
    // store.dispatch('delete_user_info');
    // window.location.href = '/';
    return Promise.reject(res);
  } else {
    alert(res.data.message);
    return Promise.reject(res);
  }
}, (error) => {
  if (error.response) {
    console.error('error: ', error.response);
    if (error.response.status === 500) {
      alert(error.response.data.message);
    } else if (error.response.status === 401) {
      alert('您无访问权限');
    } else {
      console.log('Error', error.message);
      alert('接口请求失败或超时！请刷新重试');
    }
  } else {
    alert('接口请求失败或超时！请刷新重试');
  }
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  PcCookie.set({
    key: enums.USER.REDIRECT_URI,
    value: window.location.href
  });
  mergeCartFlag();
  if (to.meta.requestAuth) {
    store.dispatch('get_access_token', (res) => {
      if (res) {
        next();
      } else {
        if (process.env.NODE_ENV === 'production') {
          window.location.href = 'http://login.paascloud.net/login';
        } else {
          window.location.href = 'http://dev-login.paascloud.net/login';
        }
      }
    });
  } else {
    next();
  }
});
router.afterEach(transition => {
  NProgress.done();
});

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
