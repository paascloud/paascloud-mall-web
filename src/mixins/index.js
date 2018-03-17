let mixin = {
  data() {
    return {};
  },
  methods: {
    getUrlParam(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      let result = window.location.search.substr(1).match(reg);
      return result ? decodeURIComponent(result[2]) : null;
    },
    loadPage(routerName, param) {
      if (param) {
        this.$router.push({name: routerName, query: param});
      } else {
        this.$router.push({name: routerName});
      }
    },
    successTips(msg) {
      alert(msg || '操作成功！');
    },
    errorTips(msg) {
      alert(msg || '哪里不对了~');
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.loadPage('Index');
    },
    goSignIn() {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = 'http://login.paascloud.net';
      } else {
        window.location.href = 'http://dev-login.paascloud.net';
      }
    },
    goSignUp() {
      if (process.env.NODE_ENV === 'production') {
        window.location.href = 'http://login.paascloud.net/register';
      } else {
        window.location.href = 'http://dev-login.paascloud.net/register';
      }
    },
    ajax(param) {
      let {type, url, data, success, isUnMusk} = param;
      if (!isUnMusk) {
        this.$pcNProgress.start();
      }
      this.$http({
        method: type || 'POST',
        url: url || '',
        data: data || ''
      }).then((res) => {
        this.$pcNProgress.done();
        if (success) {
          success(res);
        } else {
          this.goBack();
        }
      }).catch((error) => {
        this.$pcNProgress.done();
        this.$loading = false;
        console.error(error);
      });
    },
    logout() {
      this.$http({
        url: '/uac/user/logout',
        method: 'post',
        params: {
          accessToken: this.$store.getters.getAccessToken
        }
      }).then(() => {
        this.$store.dispatch('delete_user_info');
        this.$store.dispatch('clear_cart');
        this.goHome();
      }).catch(() => {
        this.$store.dispatch('delete_user_info');
        this.$store.dispatch('clear_cart');
        this.goHome();
      });
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate(value, type) {
      // 非空验证
      if (type === 'require') {
        return !!value;
      }
      // 手机号验证
      if (type === 'phone') {
        return /^1\d{10}$/.test(value);
      }
      // 邮箱格式验证
      if (type === 'email') {
        return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
      }
    }
  }
};

export default mixin;
