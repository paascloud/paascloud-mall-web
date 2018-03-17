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
          <div class="panel-title">修改密码</div>
          <div class="panel-body">
            <div class="user-info">
              <div class="form-line">
                <span class="label">原密码：</span>
                <input type="password" class="input" id="password" autocomplete="off"/>
              </div>
              <div class="form-line">
                <span class="label">新密码：</span>
                <input type="password" class="input" id="password-new" autocomplete="off"/>
              </div>
              <div class="form-line">
                <span class="label">确认密码：</span>
                <input type="password" class="input" id="password-confirm" autocomplete="off"/>
              </div>
              <span class="btn btn-submit">提交</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import pcNavSide from 'components/layout/nav-side';

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
      pcNavSide
    }
  };
</script>
