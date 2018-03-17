<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">PCMall</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="confirm-wrap w">
      <div class="panel panel-color panel-padding">
        <h1 class="panel-title panel-padding">收货地址</h1>
        <div class="panel-body address-list panel-padding">
          <template v-if="addressList.length">
            <pc-address-list :addressList="addressList" :selectAddress="selectAddress"/>
          </template>
        </div>
      </div>
      <div class="panel panel-color panel-padding">
        <h1 class="panel-title panel-padding">商品清单</h1>
        <div class="panel-body product-con panel-padding">
          <pc-product-list :orderItemVoList="orderItemVoList"/>
        </div>
        <div class="submit-con" v-show="orderItemVoList.length > 0">
          <span>订单总价:</span>
          <span class="submit-total">{{productTotalPrice | formatMoney }}</span>
          <span class="btn order-submit" @click="createOrderDoc">提交订单</span>
        </div>
      </div>
    </div>
    <div class="modal-wrap">

    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from 'components/layout/nav-side';
  import pcProductList from 'components/order/product-list';
  import pcAddressList from 'components/order/address-list';

  export default {
    data() {
      return {
        addressList: [],
        orderItemVoList: [],
        productTotalPrice: 0,
        addressId: ''
      };
    },
    created() {
      this.queryAddressList();
      this.queryOrderItemVoList();
    },
    methods: {
      selectAddress(addressId) {
        console.info(addressId);
        this.addressId = addressId;
      },
      queryAddressList() {
        this.ajax({
          url: `/omc/shipping/queryUserShippingListWithPage`,
          data: {
            pageNum: 1,
            pageSize: 50
          },
          success: (res) => {
            if (res.code === 200) {
              this.addressList = res.result.list;
            }
          }
        });
      },
      queryOrderItemVoList() {
        this.ajax({
          url: `/omc/order/getOrderCartProduct`,
          success: (res) => {
            if (!res || res.code !== 200) {
              this.loadPage('user-order');
            } else {
              this.productTotalPrice = res.result.productTotalPrice;
              this.orderItemVoList = res.result.orderItemVoList;
            }
          }
        });
      },
      createOrderDoc() {
        if (!this.addressId) {
          alert('请选择发货地址');
          return;
        }
        this.ajax({
          url: `/omc/order/createOrderDoc/` + this.addressId,
          success: (res) => {
            let orderVo = res.result;
            if (res.code === 200 && orderVo.orderNo) {
              // 清空购物车
              this.$store.dispatch('clear_cart');
              console.info('提交订单 order=', orderVo.orderNo);
              this.loadPage('order-payment', {'orderNo': orderVo.orderNo});
            } else {
              alert('支付失败');
              this.loadPage('user-order');
            }
          }
        });
      }
    },
    components: {
      pcNavSide,
      pcProductList,
      pcAddressList
    }
  };
</script>
