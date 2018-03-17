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
    <div class="pay-wrap w">
      <p class="payment-tips">订单提交成功，请尽快支付！订单号：{{orderNo}}</p>
      <p class="payment-tips enhance">请使用支付宝沙箱App扫描如下二维码进行支付：</p>
      <div class="img-con">
        <img class="qr-code" v-lazy="optUploadFileRespDto.attachmentUrl" alt="支付二维码"/>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        optUploadFileRespDto: {},
        pollTimes: 0,
        orderNo: '',
        paymentTimer: null
      };
    },
    activated() {
      this.orderNo = this.$route.query.orderNo;
      this.listenOrderStatus(this.orderNo);
      this.queryOrderItemVoList(this.orderNo);
    },
    deactivated() {
      clearInterval(this.paymentTimer);
    },
    methods: {
      listenOrderStatus(orderNo) {
        if (!orderNo) {
          return;
        }
        let paymentTimer = setInterval(() => {
          console.info('this.pollTimes', this.pollTimes);
          this.pollTimes++;
          if (this.pollTimes > 500) {
            clearInterval(paymentTimer);
            alert('支付超时');
            this.loadPage('user-order');
          }
          this.ajax({
            url: `/omc/order/queryOrderPayStatus/` + orderNo,
            isUnMusk: true,
            success: (res) => {
              if (res.result) {
                alert('支付成功');
                this.goHome();
              }
            }
          });
        }, 5e3);
        this.paymentTimer = paymentTimer;
      },
      queryOrderItemVoList(orderNo) {
        if (!orderNo) {
          alert('订单号不存在');
          return;
        }
        this.ajax({
          url: `/omc/pay/createQrCodeImage/` + orderNo,
          success: (res) => {
            if (res.code === 200) {
              this.optUploadFileRespDto = res.result;
            }
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
