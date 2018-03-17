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
    <div class="list-wrap w">
      <ul class="sort-con">
        <li :class="{'sort-item': true, 'active': sortActive}" data-type="default" @click="changeSort('default')">默认排序
        </li>
        <li :class="{'sort-item': true, 'active': !sortActive, 'asc': isAsc, 'desc': isDesc}" data-type="price"
            @click="changeSort('price')">
          <span>价格</span>
          <i class="fa fa-sort-asc"></i>
          <i class="fa fa-sort-desc"></i>
        </li>
      </ul>
      <!-- list 容器 -->
      <ul class="p-list-con">
        <pc-goods-list/>
      </ul>
      <!-- 分页容器 -->
      <div class="pagination"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcGoodsList from 'components/goods/list';

  export default {
    data() {
      return {
        sortActive: true,
        isAsc: false,
        isDesc: false,
        orderBy: 'name asc'
      };
    },
    created() {
    },
    activated() {
    },
    methods: {
      changeSort(sort) {
        if (sort === 'price') {
          this.sortActive = false;
          if (!this.isAsc && !this.isDesc) {
            this.isAsc = true;
            this.orderBy = 'price asc';
          } else {
            if (this.isAsc) {
              this.isAsc = false;
              this.isDesc = true;
              this.orderBy = 'price desc';
            } else {
              this.isAsc = true;
              this.isDesc = false;
              this.orderBy = 'price asc';
            }
          }
        } else {
          this.sortActive = !this.sortActive;
          this.orderBy = 'name asc';
        }
        this.$pcBus.$emit('productSort', this.orderBy);
      }
    },
    components: {
      pcGoodsList
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
