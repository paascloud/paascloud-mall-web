<template>
  <div>
    <div class="crumb">
      <div class="w">
        <div class="crumb-con">
          <a class="link" href="/">PCMALL</a>
          <span>></span>
          <span class="link-text">{{$route.meta.name}}</span>
        </div>
      </div>
    </div>
    <div class="about-wrap w">
      <div class="panel">
        <h1 class="panel-title">关于我们</h1>
        <div class="panel-body">
          欢迎访问PCMALL。这是一个开源项目,技术站主要是Vue全家桶+Vuex由于平时工作较忙,目前仍处于研发中,有建议请联系paascloud.net@gmail.com.
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
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
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
