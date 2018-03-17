<template>
  <div>
    <li class="p-item" v-show="product.id !== ''" v-for="product in productList" :key="product.id">
      <div class="p-img-con">
        <a class="link" @click="goProductDetailPage(product.id)">
          <img class="p-img" :src="product.mainImage" alt="name"/>
        </a>
      </div>
      <div class="p-price-con">
        <span class="p-price">￥{{product.price}}</span>
      </div>
      <div class="p-name-con">
        <a class="p-name" @click="goProductDetailPage(product.id)">{{product.name}}</a>
      </div>
    </li>
    <p class="err-tip" v-show="productList === null || productList.length < 1">很抱歉，实在找不到您要的商品。</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        queryInfo: {
          categoryId: '',
          keyword: '',
          pageNum: '1',
          pageSize: '10',
          orderBy: 'name asc'
        },
        productList: [{
          id: '',
          name: '',
          subtitle: '',
          mainImage: '',
          price: 0,
          status: '',
          imageHost: ''
        }]
      };
    },
    created() {
      this.$pcBus.$on('productSort', (orderBy) => {
        console.info('$on(\'productSort\'');
        this.queryInfo.orderBy = orderBy;
        this.queryProductList();
      });
      this.$pcBus.$on('searchProduct', () => {
        console.info('$on searchProduct');
        this.queryProductList();
      });
    },
    activated() {
      this.queryProductList();
    },
    methods: {
      goProductDetailPage(productId) {
        this.loadPage('goods-detail', {'productId': productId});
      },
      queryProductList() {
        this.queryInfo.categoryId = this.getUrlParam('categoryId');
        this.queryInfo.keyword = this.getUrlParam('keyword');
        this.ajax({
          url: `/uac/auth/product/queryProductList`,
          data: this.queryInfo,
          success: (res) => {
            if (res.code === 200) {
              if (res.result) {
                this.productList = res.result.list ? res.result.list : [];
              } else {
                this.productList = [];
              }
            }
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
