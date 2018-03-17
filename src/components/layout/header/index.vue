<template>
  <div>
    <pc-nav/>
    <div class="header">
      <div class="w">
        <a class="logo" href="javascript:void(0)" @click.prevent="goHome">PCMall</a>
        <div class="search-con">
          <input class="search-input" v-model="searchInfo" id="search-input" placeholder="请输入商品名称"/>
          <button class="btn search-btn" @click="goGoodsListPage(searchInfo)" id="search-btn" @keyup.13="goGoodsListPage(searchInfo)">搜索</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNav from 'components/layout/nav';

  export default {
    data() {
      return {
        searchInfo: ''
      };
    },
    components: {
      pcNav
    },
    methods: {
      goGoodsListPage(keyword) {
        let param = {};
        param.keyword = keyword;
        console.info(this.$route);
        if (this.$route.name === 'goods-list') {
          console.info('emit searchProduct');
          this.loadPage('goods-list', param);
          this.$pcBus.$emit('searchProduct');
        } else {
          this.loadPage('goods-list', param);
        }
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
