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
    <div class="pass-update-wrap w">
      <pc-nav-side></pc-nav-side>
      <div class="content with-nav">
        <div class="panel">
          <div class="panel-title">我的信息</div>
          <div class="panel-body">
            <pc-user-update></pc-user-update>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from 'components/layout/nav-side';
  import pcUserUpdate from 'components/user/user-update';

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
      pcNavSide,
      pcUserUpdate
    }
  };
</script>
