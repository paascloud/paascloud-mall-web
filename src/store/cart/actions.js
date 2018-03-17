import * as types from './mutations_types';

export default {
  clear_cart: ({commit}) => {
    commit(types.CLEAR_CART);
  },
  update_cart: ({commit}) => {
    commit(types.UPDATE_CART);
  },
  update_cur_index: ({commit}, obj) => {
    commit(types.UPDATE_CUR_INDEX, obj);
  },
  delete_product: ({commit}) => {
    commit(types.DELETE_PRODUCT);
    commit(types.UPDATE_CART);
  },
  push_cart: ({commit}, {userCart}) => {
    if (userCart) {
      commit(types.PUSH_CART, userCart);
      commit(types.UPDATE_CART);
    }
  },
  plus_count: ({commit}) => {
    commit(types.PLUS_COUNT);
    commit(types.UPDATE_CART);
  },
  minus_count: ({commit}) => {
    commit(types.MINUS_COUNT);
    commit(types.UPDATE_CART);
  },
  check_product: ({commit}, obj) => {
    commit(types.CHECK_PRODUCT, obj);
  },
  set_cart_list: ({commit}, obj) => {
    commit(types.SET_CART_LIST, obj);
    commit(types.UPDATE_CART);
  },
  select_product: ({commit}, obj) => {
    commit(types.SELECT_PRODUCT, obj);
    commit(types.UPDATE_CART);
  },
  un_select_product: ({commit}, obj) => {
    commit(types.UN_SELECT_PRODUCT, obj);
    commit(types.UPDATE_CART);
  },
  select_all_product: ({commit}, obj) => {
    commit(types.SELECT_ALL_PRODUCT, obj);
    commit(types.UPDATE_CART);
  },
  un_select_all_product: ({commit}, obj) => {
    commit(types.UN_SELECT_ALL_PRODUCT, obj);
    commit(types.UPDATE_CART);
  }
};
