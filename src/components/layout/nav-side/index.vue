<template>
  <ul class="nav-side">
    <li :class="{'nav-item': true, 'active': item.name === $route.name }" v-for="item in navList" :key="item.id">
      <router-link class="link" tag="a" :to="{name: item.name}">{{item.desc}}</router-link>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        name: '',
        navList: [
          {name: 'user-center', desc: '个人中心'},
          {name: 'user-order', desc: '我的订单'},
          {name: 'user-pass-update', desc: '修改密码'},
          {name: 'about', desc: '关于MMall'}
        ]
      };
    },
    created() {
    },
    methods: {
      test() {
      }
    },
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
