<template>
  <div class="user-info">
    <div class="form-line">
      <span class="label">登录名：</span>
      <span class="text">{{userForm.loginName}}</span>
    </div>
    <div class="form-line">
      <span class="label">用户名：</span>
      <span class="text">{{userForm.userName}}</span>
    </div>
    <div class="form-line">
      <span class="label">电 话：</span>
      <span class="text">{{userForm.mobileNo}}</span>
    </div>
    <div class="form-line">
      <span class="label">邮 箱：</span>
      <span class="text">{{userForm.email}}</span>
    </div>
    <a class="btn btn-submit" @click="loadPage('user-center-update')">编辑</a>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        userForm: []
      };
    },
    created() {
      this.queryUserInfo();
    },
    methods: {
      queryUserInfo() {
        this.ajax({
          url: `/uac/user/getInformation`,
          success: (res) => {
            if (res.code === 200) {
              this.userForm = res.result;
            }
          }
        });
      }
    },
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
