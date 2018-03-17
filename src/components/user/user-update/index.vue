<template>
  <div class="user-info">
    <el-form :label-position="labelPosition" label-width="60px" :model="updateUserForm">
      <el-form-item label="登录名">
        <el-input v-model="updateUserForm.loginName" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="updateUserForm.mobileNo" class="form-line-input" :disabled="true"/>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="updateUserForm.userName" class="form-line-input"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="updateUserForm.email" class="form-line-input"/>
        <el-button :plain="true" type="danger" @click="getEmailCode">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="updateUserForm.emailCode" class="form-line-input"/>
      </el-form-item>
    </el-form>
    <a class="btn btn-submit" @click="updateUserInfo">保存</a>
  </div>
</template>
<script type="text/ecmascript-6">
  import {gbs} from '../../../util/settings';
  export default {
    data() {
      return {
        errMsg: '',
        labelPosition: 'right',
        updateUserForm: {
          userName: '',
          mobileNo: '',
          email: '',
          emailCode: ''
        }
      };
    },
    created() {
      this.queryUserInfo();
    },
    methods: {
      getEmailCode() {
        let email = this.updateUserForm.email;
        let keyStr = gbs.secret.key_str;
        let ivStr = gbs.secret.iv_str;
        email = this.$pcEncrypt.aesEncrypt(email, keyStr, ivStr);
        this.ajax({
          url: `/uac/email/sendRestEmailCode`,
          isUnMusk: true,
          data: {
            email: email
          },
          success: (res) => {
            if (res && res.code === 200) {
              console.info('发送验证码成功');
            }
          }
        });
      },
      updateUserInfo() {
        let _this = this;
        if (!this.validate(this.updateUserForm.email, 'require')) {
          alert('请填写邮箱地址');
          return;
        }
        if (!this.validate(this.updateUserForm.email, 'email')) {
          alert('邮箱格式不正确');
          return;
        }

        let email = this.updateUserForm.email;
        if (!email) {
          alert('邮箱地址不能为空');
          return;
        }
        let keyStr = gbs.secret.key_str;
        let ivStr = gbs.secret.iv_str;
        email = this.$pcEncrypt.aesEncrypt(email, keyStr, ivStr);
        this.ajax({
          url: `/uac/email/checkRestEmailCode`,
          isUnMusk: true,
          data: {
            email: email,
            emailCode: _this.updateUserForm.emailCode
          },
          success: (res) => {
            if (res.code === 200) {
              _this.ajax({
                url: `/uac/user/updateInformation`,
                isUnMusk: true,
                data: {
                  email: _this.updateUserForm
                },
                success: () => {
                  alert('操作成功');
                }
              });
            }
          }
        });
      },
      queryUserInfo() {
        this.ajax({
          url: `/uac/user/getInformation`,
          success: (res) => {
            if (res.code === 200) {
              this.updateUserForm = res.result;
            }
          }
        });
      }
    },
    components: {}
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .user-info .error-item {
    position: relative;
    padding: 4px 0 4px 40px;
    margin-bottom: 10px;
    border: 1px solid red;
    color: red;
    background: #fde9e9;
  }
</style>
