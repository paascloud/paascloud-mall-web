import {PcLockr, enums} from 'util/';

export default {
  cartList: PcLockr.get(enums.CART.SHOPPING_CART) ? JSON.parse(PcLockr.get(enums.CART.SHOPPING_CART)) : [],
  cartInfo: {
    totalPrice: 0,
    totalNum: 0
  },
  curIndex: -1
};
