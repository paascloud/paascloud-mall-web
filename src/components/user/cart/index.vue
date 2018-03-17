<template>
  <div>
    <div id="cart_table" v-show="cartList.length !== 0">
      <div class="cart-header">
        <table class="cart-table">
          <tr>
            <th class="cart-cell cell-check">
              <label class="cart-label">
                <input type="checkbox" class="cart-select-all" v-model="checkedAllFlag" @click="selectAll"/>
                <span>全选</span>
              </label>
            </th>
            <th class="cart-cell cell-info">商品信息</th>
            <th class="cart-cell cell-price">单价</th>
            <th class="cart-cell cell-count">数量</th>
            <th class="cart-cell cell-total">合计</th>
            <th class="cart-cell cell-opera">操作</th>
          </tr>
        </table>
      </div>
      <div class="cart-list">
        <table class="cart-table" data-product-id="productId">
          <tr v-for="cart in cartList" :key="cart.productId">
            <td class="cart-cell cell-check">
              <label class="cart-label">
                <input type="checkbox" class="cart-select" @click="selectProduct(cart)" v-model="cart.checked"/>
              </label>
            </td>
            <td class="cart-cell cell-img">
              <a class="link" @click="loadPage('goods-detail', {'productId': cart.productId})">
                <img class="p-img" :src="cart.mainImage" alt="productName"/>
              </a>
            </td>
            <td class="cart-cell cell-info">
              <a class="link" @click="loadPage('goods-detail', {'productId': cart.productId})">{{cart.productName}}</a>
            </td>
            <td class="cart-cell cell-price">{{cart.productPrice | formatMoney}}</td>
            <td class="cart-cell cell-count">
              <span class="count-btn minus" @click="actionCart(cart, 'minus_count')">-</span>
              <input class="count-input" :value="cart.quantity" data-max="cart.productStock"/>
              <span class="count-btn plus" @click="actionCart(cart, 'plus_count')">+</span>
            </td>
            <td class="cart-cell cell-total">{{cart.productPrice * cart.quantity | formatMoney}}</td>
            <td class="cart-cell cell-opera">
              <span class="link cart-delete" @click="actionCart(cart, 'delete_product')">删除</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="cart-footer">
        <div class="select-con">
          <label>
            <input type="checkbox" class="cart-select-all" v-model="checkedAllFlag" @click="selectAll"/>
            <span>全选</span>
          </label>
        </div>
        <div class="delete-con">
                    <span class="link delete-selected">
                    <i class="fa fa-trash-o"></i>
                    <span @click="deleteSelectProduct">删除选中</span>
                    </span>
        </div>
        <div class="submit-con">
          <div v-if="cartInfo.totalNum > 0">
            <span>已选择{{cartInfo.totalNum}}件商品</span>
            <span>总价：</span>
            <span class="submit-total">{{cartInfo.totalPrice | formatMoney}}</span>
            <span @click="loadPage('order-confirm')" class="btn btn-submit">去结算</span>
          </div>
        </div>
      </div>
    </div>
    <p v-show="cartList.length === 0" class="err-tip">
      <span>您的购物车空空如也，</span>
      <a style="cursor: pointer;" @click="goHome">立即去购物</a>
    </p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        checkedAllFlag: '',
        userCart: [],
        selectProductIdArr: []
      };
    },
    created() {
    },
    activated() {
      this.isCheckAll();
    },
    computed: {
      cartInfo() {
        return this.$store.getters.getCartInfo;
      },
      cartList() {
        return this.$store.getters.getCartList;
      }
    },
    filters: {},
    methods: {
      selectProduct(item) {
        let productId = item.productId;
        this.$store.dispatch('check_product', {productId});
        if (this.$store.getters.getCurIndex !== -1) {
          console.info(item.checked);
          if (item.checked) { // checkBox 自动转型
            this.$store.dispatch('un_select_product', {productId});
          } else {
            this.$store.dispatch('select_product', {productId});
          }
          this.isCheckAll();
        }
      },
      isCheckAll() {
        this.checkedAllFlag = 'checked';
        for (let index in this.cartList) {
          let item = this.cartList[index];
          if (typeof item.checked === 'undefined' || item.checked === 0) {
            this.checkedAllFlag = '';
            break;
          }
        }
      },
      selectAll(event) {
        let checkedAll = event.currentTarget.checked;
        for (let item of this.cartList) {
          if (item.checked === checkedAll) {
            continue;
          }
          let productId = item.productId;
          this.$store.dispatch('check_product', {productId});
          if (this.$store.getters.getCurIndex !== -1) {
            if (checkedAll) { // checkBox 自动转型
              this.$store.dispatch('select_product', {productId});
            } else {
              this.$store.dispatch('un_select_product', {productId});
            }
          }
        }
      },
      getCartIndex(id) {
        let index = -1;
        let list = this.cartList;
        for (let i = 0; i < list.length; i++) {
          if (list[i].productId === id) {
            index = i;
            break;
          }
        }
        return index;
      },
      /**
       * 购物车加减删操作
       * @param  {number} index 当前操作的索引
       * @param  {string} type  对应的mutations值[plus_count增加, minus_count 减少, delete_product 删除]
       */
      actionCart(cart, type) {
        let index = this.getCartIndex(cart.productId);
        this.$store.dispatch('update_cur_index', {index});
        this.$store.dispatch(type);
      },
      deleteSelectProduct() {
        console.info('this.cartList', this.cartList);
        for (let item of this.cartList) {
          console.info(item.productId);
          if (item.checked || item.checked === 1) {
            this.actionCart(item, 'delete_product');
          }
        }
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
