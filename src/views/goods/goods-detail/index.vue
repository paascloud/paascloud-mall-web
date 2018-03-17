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
    <pc-goods-detail/>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcGoodsDetail from 'components/goods/detail';

  export default {
    data() {
      return {};
    },
    created() {
    },
    activated() {
    },
    methods: {
      test() {
      }
    },
    components: {
      pcGoodsDetail
    }
  };
</script>
