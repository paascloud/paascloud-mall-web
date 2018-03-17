<template>
  <div>
    <pc-nav-simple></pc-nav-simple>
    <div class="result-wrap w">
      <div class="result-con register-success" v-show="showRegisterSuccess">
        <h1 class="result-title">恭喜您，注册成功！</h1>
        <div class="result-content">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">回到首页</a>
          <a class="link" @click="goSignIn">立即去登录</a>
        </div>
      </div>
      <div class="result-con pass-reset-success" v-show="showResetSuccess">
        <h1 class="result-title">恭喜您，重置密码成功！</h1>
        <div class="result-content">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">回到首页</a>
          <a class="link" @click="goSignIn">立即去登录</a>
        </div>
      </div>
      <div class="result-con cart-add-success" v-show="showCartAddSuccess">
        <h1 class="result-title">您的商品已成功加入购物车！</h1>
        <div class="result-content">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">继续购物</a>
          <a class="link" href="javascript:void(0)" @click.prevent="goCartPage">去购物车查看</a>
        </div>
      </div>
      <div class="result-con default-success" v-show="showDefaultSuccess">
        <h1 class="result-title">恭喜您，操作成功！</h1>
        <div class="result-content">
          <a class="link" href="javascript:void(0)" @click.prevent="goHome">回到首页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSimple from 'src/components/layout/nav-simple';

  export default {
    data() {
      return {
        showRegisterSuccess: false,
        showResetSuccess: false,
        showCartAddSuccess: false,
        showDefaultSuccess: false
      };
    },
    created() {
    },
    activated() {
      if (this.$route.query.type === 'pass-reset') {
        this.viewResetPwdSuccess();
      } else if (this.$route.query.type === 'user-register') {
        this.viewRegisterSuccess();
      } else if (this.$route.query.type === 'user-cart') {
        this.viewCartAddSuccess();
      } else {
        this.viewDefaultSuccess();
      }
    },
    methods: {
      viewRegisterSuccess() {
        this.showRegisterSuccess = true;
        this.showResetSuccess = false;
        this.showCartAddSuccess = false;
        this.showDefaultSuccess = false;
      },
      viewResetPwdSuccess() {
        this.showRegisterSuccess = false;
        this.showResetSuccess = true;
        this.showCartAddSuccess = false;
        this.showDefaultSuccess = false;
      },
      viewCartAddSuccess() {
        this.showRegisterSuccess = false;
        this.showResetSuccess = false;
        this.showCartAddSuccess = true;
        this.showDefaultSuccess = false;
      },
      viewDefaultSuccess() {
        this.showRegisterSuccess = false;
        this.showResetSuccess = false;
        this.showCartAddSuccess = false;
        this.showDefaultSuccess = true;
      },
      goCartPage() {
        this.loadPage('user-cart');
      }
    },
    components: {
      pcNavSimple
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .result-wrap {
    margin-top: 20px;
    padding: 30px 0;
    text-align: center;
    background: #fff;
  }
</style>
