<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <a class="link" href="/">PCMall</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="cart-wrap w">
      <pc-cart></pc-cart>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcCart from 'components/user/cart';

  export default {
    data() {
      return {};
    },
    created() {
    },
    methods: {
      test() {
      }
    },
    components: {
      pcCart
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>

