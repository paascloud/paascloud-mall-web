import * as types from './mutations_types';
import store from '../../store/';
import {PcLockr, enums, PcCookie} from 'util/';
import axios from 'axios';

axios.interceptors.request.use((config) => {
  let authToken = PcCookie.get(enums.USER.AUTH_TOKEN);
  config.headers.Authorization = 'Bearer ' + authToken;
  return config;
}, (error) => {
  return Promise.reject(error);
});
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://api.paascloud.net/';
}

axios.interceptors.response.use((res) => {
  if (res.data.code !== 200 && res.data.code !== 500) {
    if (res.data.code === 100009 || res.data.code === 100010 || res.data.code === 100006) {
      // TOKEN解析失败 || 操作频率过快, 您的帐号已被冻结 || 会话超时,请刷新页面重试
      window.location.href = '/';
      return Promise.reject(res);
    }
  } else {
    if (res.data) {
      return res.data;
    }
  }
}, (error) => {
  if (error.response) {
    console.error('error: ', error.response);
    if (error.response.status === 500) {
      alert(error.response.data.message);
    } else if (error.response.status === 504) {
      alert('网关错误');
    } else {
      console.log('Error', error.message);
      alert('接口请求失败或超时！请刷新重试');
    }
  } else {
    alert('接口请求失败或超时！请刷新重试');
  }
});

export default {
  [types.CLEAR_CART](state) {
    state.cartList = [];
    PcLockr.delete(enums.CART.SHOPPING_CART);
  },
  [types.UPDATE_CART](state) {
    PcLockr.set(enums.CART.SHOPPING_CART, JSON.stringify(state.cartList));
  },
  [types.SET_CART_LIST](state, cartList) {
    console.info('SET_CART_LIST', cartList);
    state.cartList = cartList;
  },
  [types.UPDATE_CUR_INDEX](state, {index = -1}) {
    state.curIndex = index;
  },
  [types.DELETE_PRODUCT](state) {
    if (state.curIndex >= 0) {
      let cartItem = state.cartList[state.curIndex];
      state.cartList[state.curIndex].quantity = 0;
      state.cartList.splice(state.curIndex, 1);
      if (PcCookie.get(enums.USER.LOGIN_NAME)) {
        axios.post(`/uac/cart/deleteProduct/` + cartItem.productId);
      }
    }
  },
  [types.PUSH_CART](state, product) {
    state.cartList.push(product);
    let loginName = store.getters.getLoginName;
    if (loginName) {
      axios.post(`/uac/cart/addProduct/` + product.productId + '/' + product.quantity);
    }
  },
  [types.PLUS_COUNT](state) {
    state.cartList[state.curIndex].quantity = parseInt(state.cartList[state.curIndex].quantity);
    state.cartList[state.curIndex].quantity++;
    let loginName = store.getters.getLoginName;
    if (loginName) {
      let cartItem = state.cartList[state.curIndex];
      axios.post(`/uac/cart/updateProduct/` + cartItem.productId + '/' + state.cartList[state.curIndex].quantity);
    }
  },
  [types.MINUS_COUNT](state) {
    state.cartList[state.curIndex].quantity = parseInt(state.cartList[state.curIndex].quantity);
    state.cartList[state.curIndex].quantity--;
    if (store.getters.getLoginName) {
      let cartItem = state.cartList[state.curIndex];
      console.info('state.cartList[state.curIndex].quantity', state.cartList[state.curIndex].quantity);
      axios.post(`/uac/cart/updateProduct/` + cartItem.productId + '/' + state.cartList[state.curIndex].quantity);
    }
    if (state.cartList[state.curIndex].quantity === 0) {
      state.cartList.splice(state.curIndex, 1);
    }
  },
  [types.CHECK_PRODUCT](state, {productId}) {
    state.curIndex = -1;
    let list = state.cartList;
    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].productId === productId) {
          state.curIndex = i;
          break;
        }
      }
    }
  },
  [types.SELECT_PRODUCT](state, {productId}) {
    console.info('选中', state, productId);
    state.cartList[state.curIndex].checked = 1;
    if (PcCookie.get(enums.USER.LOGIN_NAME)) {
      axios.post(`/uac/cart/selectProduct/` + productId);
    }
  },
  [types.UN_SELECT_PRODUCT](state, {productId}) {
    console.info('取消选中', state, productId);
    state.cartList[state.curIndex].checked = 0;
    if (PcCookie.get(enums.USER.LOGIN_NAME)) {
      axios.post(`/uac/cart/unSelectProduct/` + productId);
    }
  },
  [types.SELECT_ALL_PRODUCT](state) {
    for (let index in state.cartList) {
      state.cartList[index].checked = 1;
    }
    if (PcCookie.get(enums.USER.LOGIN_NAME)) {
      axios.post(`/uac/cart/selectAllProduct/`);
    }
  },
  [types.UN_SELECT_ALL_PRODUCT](state) {
    for (let index in state.cartList) {
      state.cartList[index].checked = 0;
    }
    if (PcCookie.get(enums.USER.LOGIN_NAME)) {
      axios.post(`/uac/cart/unSelectAllProduct/`);
    }
  }
};
