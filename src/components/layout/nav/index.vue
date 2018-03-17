<template>
  <div class="nav">
    <div class="w">
      <div class="user-info">
                <span class="user not-login" v-show="loginName == null || loginName === ''">
                    <span class="link js-login" @click="goSignIn">登录</span>
                    <span class="link js-register" @click="goSignUp">注册</span>
                </span>
        <span class="user login" v-show="loginName != null && loginName !== ''">
                    <span class="link-text">
                        欢迎，
                        <span class="username">{{loginName}}</span>
                    </span>
                    <span class="link js-logout" @click.prevent="logout">退出</span>
                </span>
      </div>
      <ul class="nav-list">
        <li class="nav-item">
          <a class="link" @click="loadPage('user-cart')">
            <i class="fa fa-shopping-cart"></i>
            购物车(<span class="cart-count">{{cartList.length}}</span>)
          </a>
        </li>
        <li class="nav-item">
          <a class="link" href="javascript:void(0)" @click.prevent="loadPage('user-order')">我的订单</a>
        </li>
        <li class="nav-item">
          <a class="link" href="javascript:void(0)" @click.prevent="loadPage('user-center')">我的PCMall</a>
        </li>
        <li class="nav-item">
          <a class="link" href="javascript:void(0)" @click.preventk="loadPage('about')">关于PCMall</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods: {},
    computed: {
      loginName() {
        return this.$store.getters.getLoginName;
      },
      cartList() {
        return this.$store.getters.getCartList;
      }
    }
  };
</script>
