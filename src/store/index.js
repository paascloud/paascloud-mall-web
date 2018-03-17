import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import user from './user/';
import cart from './cart/';
Vue.use(Vuex);

Vue.prototype.$http = axios.create({
  timeout: 60000
});

export default new Vuex.Store({
  modules: {
    user,
    cart
  }
});
