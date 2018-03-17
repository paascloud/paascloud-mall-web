<template>
  <div>
    <table class="product-table">
      <tr>
        <th class="cell-img">&nbsp;</th>
        <th class="cell-info">商品描述</th>
        <th class="cell-price">价格</th>
        <th class="cell-count">数量</th>
        <th class="cell-total">小计</th>
      </tr>
      <tr v-for="order in orderItemVoList" :key="order.productId">
        <td class="cell-img">
          <a href="detail.html" target="_blank">
            <img class="p-img" v-lazy="order.productImage" :alt="order.productName"/>
          </a>
        </td>
        <td class="cell-info">
          <a class="link" @click="loadPage('goods-detail', {'productId': order.productId})">{{order.productName}}</a>
        </td>
        <td class="cell-price">{{order.currentUnitPrice | formatMoney}}</td>
        <td class="cell-count">{{order.quantity}}</td>
        <td class="cell-total">{{order.totalPrice | formatMoney}}</td>
      </tr>
    </table>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      orderItemVoList: {
        type: Array,
        required: false
      }
    },
    data() {
      return {};
    },
    created() {
    },
    methods: {},
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
